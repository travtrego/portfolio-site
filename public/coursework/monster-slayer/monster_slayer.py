# random lets the game choose unpredictable damage and healing amounts.
import random
import json
import os
from pathlib import Path
import tempfile

# tkinter creates the game window, labels, buttons, and battle log.
# We use the shorter name "tk" when referring to it.
import tkinter as tk

# ttk provides styled buttons and progress bars for the health displays.
from tkinter import ttk, simpledialog, messagebox


class HighScores:
    # Keep each username's fastest victory in readable JSON text.
    # Names are matched exactly, including capitalization.
    def __init__(self, path):
        self.path = Path(path)

    def load(self):
        try:
            text = self.path.read_text(encoding="utf-8")
        except FileNotFoundError:
            return {}
        rows = json.loads(text)
        if not isinstance(rows, list):
            raise ValueError("The high-score file must contain a list.")
        best = {}
        for row in rows:
            if not isinstance(row, dict):
                raise ValueError("Invalid high-score entry.")
            name, rounds = row.get("username"), row.get("rounds")
            if (not isinstance(name, str) or not name.strip()
                    or type(rounds) is not int or rounds < 1):
                raise ValueError("Invalid username or round count.")
            best[name] = min(rounds, best.get(name, rounds))
        return best

    def record_win(self, username, rounds):
        # Reload on each victory to include earlier program sessions.
        # Stop on read errors rather than overwriting an unreadable file.
        if not username.strip() or type(rounds) is not int or rounds < 1:
            raise ValueError("A score needs a username and positive rounds.")
        best = self.load()
        best[username] = min(rounds, best.get(username, rounds))
        ordered = sorted(best.items(), key=lambda item: (item[1], item[0].casefold(), item[0]))
        rows = [{"username": name, "rounds": count} for name, count in ordered]

        # Replace the saved file only after the entire update is written.
        # Failed writes leave the previous high scores intact.
        temporary_path = None
        try:
            with tempfile.NamedTemporaryFile(
                mode="w", encoding="utf-8", dir=self.path.parent,
                prefix=self.path.name + ".", suffix=".tmp", delete=False,
            ) as handle:
                temporary_path = Path(handle.name)
                json.dump(rows, handle, ensure_ascii=False, indent=2)
                handle.write("\n")
                handle.flush()
                os.fsync(handle.fileno())
            os.replace(temporary_path, self.path)
        finally:
            if temporary_path is not None and temporary_path.exists():
                temporary_path.unlink()
        return ordered


def ask_player_name(root):
    # This is called only when the program opens, never by New Game.
    # Cancel returns None so the program can close without starting a battle.
    while True:
        name = simpledialog.askstring(
            "Welcome to Monster Slayer",
            "Choose your username (1-20 characters):",
            parent=root,
        )
        if name is None:
            return None
        name = name.strip()
        if 1 <= len(name) <= 20:
            return name
        messagebox.showerror(
            "Choose a username",
            "Please enter a name with 1-20 characters.",
            parent=root,
        )


# A class groups the game's information and actions in one place.
# "self" refers to this particular game and lets its methods share information.
class MonsterSlayer:

    # These settings control the game's balance.
    # Keeping them together makes them easy to change later.
    STARTING_HEALTH = 100

    # Each pair contains the lowest and highest possible random amount.
    # For example, a regular attack can deal any whole number from 6 to 12.
    REGULAR_DAMAGE = (6, 12)
    STRONG_DAMAGE = (15, 22)
    # A stronger monster gives it a slight advantage and rewards using
    # strong attacks and healing instead of relying on regular attacks alone.
    MONSTER_DAMAGE = (10, 18)
    HEAL_AMOUNT = (12, 20)

    # Cooldowns are measured from the turn when an action is used.
    # Each difficulty contains (strong attack cooldown, healing cooldown).
    # Difficulty changes waiting times only, never health or damage.
    DIFFICULTIES = {
        "Easy": (2, 3),
        "Normal": (3, 5),
        "Hard": (4, 7),
    }

    # These hexadecimal color codes control the window's appearance.
    BACKGROUND = "#172033"
    FOREGROUND = "#f4f6fb"
    MUTED = "#bac5d8"
    ACCENT = "#f5c76b"

    def __init__(self, root, player_name="Player", score_path=None):
        # __init__ runs when a MonsterSlayer game is first created.
        # "root" is the main window, which we save for use throughout the game.
        self.root = root

        # The name belongs to the program session, not an individual battle.
        # new_game() resets combat values but leaves this name alone.
        self.player_name = player_name
        # Save beside this script, even when launched from another folder.
        self.high_scores = HighScores(
            score_path if score_path is not None
            else Path(__file__).resolve().with_name("monster_slayer_highscores.txt")
        )
        self.difficulty_choice = tk.StringVar(master=root, value="Normal")
        self.difficulty = "Normal"
        self.strong_cooldown, self.heal_cooldown = self.DIFFICULTIES[self.difficulty]
        self.choosing_difficulty = True

        self.root.title("Monster Slayer")
        self.root.geometry("640x700")
        self.root.minsize(540, 620)
        self.root.configure(bg=self.BACKGROUND)

        # A monster attack happens after a short delay.
        # We save its scheduled ID so restarting can cancel it.
        # None means that no attack is currently scheduled.
        self.pending_attack = None

        # These flags track whether combat has ended or a turn is resolving.
        self.game_over = False
        self.busy = False

        # Build the interface, then let the player choose the first difficulty.
        self.configure_styles()
        self.build_interface()
        self.new_game()

    def configure_styles(self):
        # ttk uses named styles to control how its widgets look.
        style = ttk.Style(self.root)

        # The "clam" theme lets us customize health bar colors.
        style.theme_use("clam")

        # Green health bar for the player.
        style.configure(
            "Player.Horizontal.TProgressbar",
            troughcolor="#303d54",
            background="#45c98a",
            borderwidth=0,
            thickness=24,
        )

        # Red health bar for the monster.
        style.configure(
            "Monster.Horizontal.TProgressbar",
            troughcolor="#303d54",
            background="#ed6a71",
            borderwidth=0,
            thickness=24,
        )

        # Use the same font and spacing for all game buttons.
        style.configure(
            "Combat.TButton",
            font=("Segoe UI", 10, "bold"),
            padding=(8, 14),
        )

    def label(self, parent, text="", size=12, color=None):
        # This helper creates a label with our standard colors and font.
        # It avoids repeating the same styling code for every label.
        #
        # "parent" is the window or frame that contains the label.
        # If no custom color is supplied, use the normal foreground color.
        return tk.Label(
            parent,
            text=text,
            font=("Segoe UI", size),
            bg=self.BACKGROUND,
            fg=color or self.FOREGROUND,
        )

    def build_interface(self):
        # The outer frame adds space around the game's content.
        shell = tk.Frame(self.root, bg=self.BACKGROUND)
        shell.pack(fill="both", expand=True, padx=18, pady=16)

        # Reserve space for New Game before placing the other widgets.
        # Packing it at the bottom FIRST keeps the battle log from using
        # its space when the window is small or Windows enlarges text.
        # Passing self.new_game without parentheses runs it only on a click.
        self.restart_button = ttk.Button(
            shell,
            text="New Game",
            style="Combat.TButton",
            command=self.new_game,
        )
        self.restart_button.pack(side="bottom", fill="x", pady=(10, 0))

        # A scrollable area keeps the game accessible on smaller screens
        # and with large Windows text. New Game stays outside this area,
        # so it is always visible, even while the rest of the game scrolls.
        viewport = tk.Frame(shell, bg=self.BACKGROUND)
        viewport.pack(fill="both", expand=True)
        self.content_canvas = tk.Canvas(
            viewport, bg=self.BACKGROUND, highlightthickness=0,
            width=1, height=1,
        )
        scrollbar = ttk.Scrollbar(
            viewport, orient="vertical", command=self.content_canvas.yview,
        )
        scrollbar.pack(side="right", fill="y")
        self.content_canvas.pack(side="left", fill="both", expand=True)
        self.content_canvas.configure(yscrollcommand=scrollbar.set)
        panel = tk.Frame(self.content_canvas, bg=self.BACKGROUND)
        self.content_panel = panel
        self.content_window = self.content_canvas.create_window(
            (0, 0), window=panel, anchor="nw",
        )
        panel.bind("<Configure>", self.resize_content)
        self.content_canvas.bind("<Configure>", self.resize_content)
        self.root.bind("<MouseWheel>", self.scroll_content)

        # pack() places a widget inside its parent.
        # By default, each packed widget appears below the previous one.
        self.label(
            panel,
            "MONSTER SLAYER",
            27,
            self.ACCENT,
        ).pack()

        self.label(
            panel,
            "Choose your move. Survive the monster.",
            11,
        ).pack(pady=(4, 16))

        # This selection panel appears before each battle. The username
        # is already known and is never requested again by this screen.
        self.selection_panel = tk.Frame(panel, bg=self.BACKGROUND)
        greeting = self.label(self.selection_panel, f"Welcome, {self.player_name}!", 16)
        greeting.configure(wraplength=490)
        greeting.pack(pady=(10, 18))
        self.label(self.selection_panel, "Choose your difficulty", 15, self.ACCENT).pack()
        self.difficulty_buttons = []
        for name, (strong, heal) in self.DIFFICULTIES.items():
            option = tk.Radiobutton(
                self.selection_panel,
                text=f"{name}\nStrong Attack: {strong} turns  |  Heal: {heal} turns",
                variable=self.difficulty_choice, value=name,
                font=("Segoe UI", 12), justify="left", anchor="w",
                bg=self.BACKGROUND, fg=self.FOREGROUND,
                activebackground=self.BACKGROUND, activeforeground=self.ACCENT,
                selectcolor=self.BACKGROUND, highlightthickness=0,
                wraplength=450, padx=8, pady=12,
            )
            option.pack(fill="x", pady=6)
            self.difficulty_buttons.append(option)
        hint = self.label(
            self.selection_panel,
            "Cooldowns begin when you use an action.\n"
            "Both special actions start available.\n"
            "Select Start Battle below to play.",
            11, self.MUTED,
        )
        hint.configure(wraplength=490)
        hint.pack(pady=18)

        # Selection and combat share the same scrollable space.
        # Only one is displayed at a time.
        self.battle_panel = tk.Frame(panel, bg=self.BACKGROUND)
        self.battle_panel.pack(fill="both", expand=True)
        panel = self.battle_panel

        # Save labels that will need to change during the game.
        # refresh_interface() supplies their current text.
        self.turn_label = self.label(panel, size=15)
        self.turn_label.pack(pady=(0, 14))

        # Player health: a numeric label followed by a visual health bar.
        self.player_label = self.label(
            panel, text=f"{self.player_name}    100 / 100 health"
        )
        # Long names wrap instead of widening or clipping the window.
        self.player_label.configure(wraplength=490, justify="left")
        self.player_label.bind("<Configure>", self.resize_content)
        self.player_label.pack(anchor="w")

        self.player_bar = ttk.Progressbar(
            panel,
            maximum=self.STARTING_HEALTH,
            style="Player.Horizontal.TProgressbar",
        )
        self.player_bar.pack(fill="x", pady=(6, 16))

        # Monster health uses the same layout.
        self.monster_label = self.label(panel)
        self.monster_label.pack(anchor="w")

        self.monster_bar = ttk.Progressbar(
            panel,
            maximum=self.STARTING_HEALTH,
            style="Monster.Horizontal.TProgressbar",
        )
        self.monster_bar.pack(fill="x", pady=(6, 20))

        # Put all three action buttons in their own frame.
        actions = tk.Frame(panel, bg=self.BACKGROUND)
        actions.pack(fill="x")

        # A button's "command" tells Tkinter what to run when clicked.
        # lambda lets us pass a particular action into take_turn().
        # Without this wrapper, take_turn() would run while building the button.
        self.attack_button = ttk.Button(
            actions,
            text="Regular Attack",
            style="Combat.TButton",
            command=lambda: self.take_turn("regular"),
        )

        self.strong_button = ttk.Button(
            actions,
            text="Strong Attack",
            style="Combat.TButton",
            command=lambda: self.take_turn("strong"),
        )

        self.heal_button = ttk.Button(
            actions,
            text="Heal",
            style="Combat.TButton",
            command=lambda: self.take_turn("heal"),
        )

        # grid() arranges the buttons in columns inside the actions frame.
        # Each column gets equal weight so the buttons share available space.
        #
        # pack() and grid() can be used in one application as long as they
        # do not manage widgets inside the same parent container.
        for column, button in enumerate(
            [self.attack_button, self.strong_button, self.heal_button]
        ):
            actions.columnconfigure(column, weight=1)
            button.grid(
                row=0,
                column=column,
                sticky="ew",
                padx=3,
            )

        # This label shows instructions, monster activity, or the final result.
        # wraplength lets longer messages wrap onto another line.
        self.status_label = self.label(
            panel,
            size=11,
            color=self.ACCENT,
        )
        self.status_label.configure(wraplength=490)
        # A result message may add lines without resizing the outer window.
        # Recalculate the scrollable height when that label changes size.
        self.status_label.bind("<Configure>", self.resize_content)
        self.status_label.pack(pady=15)

        # Hidden until a victory, with a scrollbar for longer leaderboards.
        self.scores_panel = tk.Frame(panel, bg=self.BACKGROUND)
        self.label(self.scores_panel, "HIGH SCORES", 16, self.ACCENT).pack()
        self.scores_message = self.label(self.scores_panel, size=11)
        self.scores_message.configure(wraplength=490)
        self.scores_message.pack(pady=(5, 10))
        score_list = tk.Frame(self.scores_panel, bg=self.BACKGROUND)
        score_list.pack(fill="both", expand=True)
        self.scores_text = tk.Text(
            score_list, height=7, width=1, wrap="word", state="disabled",
            font=("Segoe UI", 11), bg="#0f1726", fg=self.FOREGROUND,
            relief="flat", padx=12, pady=12, cursor="arrow",
        )
        score_scrollbar = ttk.Scrollbar(score_list, command=self.scores_text.yview)
        score_scrollbar.pack(side="right", fill="y")
        self.scores_text.pack(side="left", fill="both", expand=True)
        self.scores_text.configure(yscrollcommand=score_scrollbar.set)
        self.scores_text.tag_configure("current_player", foreground=self.ACCENT)

        self.log_heading = self.label(panel, "BATTLE LOG", 11, self.MUTED)
        self.log_heading.pack(anchor="w")

        # The Text widget displays the history of the fight.
        # "disabled" makes the log read-only for the player.
        # The game briefly enables it whenever it needs to add a message.
        self.log = tk.Text(
            panel,
            # Reserve three readable lines, then expand into spare space.
            # A tiny requested width lets the controls determine window width.
            height=3,
            width=1,
            state="disabled",
            wrap="word",
            font=("Segoe UI", 11),
            bg="#0f1726",
            fg=self.FOREGROUND,
            relief="flat",
            padx=12,
            pady=12,
            cursor="arrow",
        )
        self.log.pack(
            fill="both",
            expand=True,
            pady=(7, 14),
        )

        # Measure the longest labels before choosing a starting size.
        # Cap the height to fit this screen; any overflow can be scrolled.
        self.strong_button.configure(text="Strong (4 turns)")
        self.heal_button.configure(text="Heal (7 turns)")
        required_width = 0
        required_height = 0
        for result in (
            "You win! The monster has been defeated.",
            "The monster wins! You have been defeated.",
        ):
            self.status_label.configure(
                text=f"{result}\nStart a new game? Click New Game below."
            )
            self.root.update_idletasks()
            required_width = max(
                required_width, self.content_panel.winfo_reqwidth() + 36 + scrollbar.winfo_reqwidth()
            )
            required_height = max(
                required_height, self.content_panel.winfo_reqheight() + 42 + self.restart_button.winfo_reqheight()
            )

        # Also measure the selection screen so long names and options fit.
        self.battle_panel.pack_forget()
        self.selection_panel.pack(fill="both", expand=True)
        self.root.update_idletasks()
        required_width = max(required_width, self.content_panel.winfo_reqwidth() + 36 + scrollbar.winfo_reqwidth())

        available_height = max(300, self.root.winfo_screenheight() - 100)
        self.root.minsize(max(540, required_width), min(620, available_height))
        self.root.geometry(
            f"{max(640, required_width)}x{min(max(700, required_height), available_height)}"
        )
        # new_game() replaces these measurement labels with the real state.

    def resize_content(self, event=None):
        # Give the content its full requested height, even if the visible
        # area is shorter. The scrollbar then reveals the overflow.
        canvas = self.content_canvas
        width = max(canvas.winfo_width(), self.content_panel.winfo_reqwidth())
        height = max(canvas.winfo_height(), self.content_panel.winfo_reqheight())
        canvas.itemconfigure(
            self.content_window,
            width=width,
            height=height,
        )
        # Use the new dimensions directly: Tkinter may not have redrawn
        # the canvas yet, so querying its old bounds can miss the last line.
        canvas.configure(scrollregion=(0, 0, width, height))

    def scroll_content(self, event):
        # Scrolling over the battle log should scroll its messages.
        # Elsewhere, the mouse wheel scrolls the whole game panel.
        if event.widget in (self.log, self.scores_text):
            return
        self.content_canvas.yview_scroll(-int(event.delta / 120), "units")
        return "break"

    def write_log(self, message):
        # Temporarily unlock the log so the program can insert text.
        self.log.configure(state="normal")

        # "end" adds the message after existing text.
        # "\n" starts a new line after the message.
        self.log.insert("end", message + "\n")

        # Automatically scroll to the latest message, then lock the log again.
        self.log.see("end")
        self.log.configure(state="disabled")

    def new_game(self):
        # If a monster attack was waiting to happen, cancel it.
        # Otherwise, an attack from the old game could damage the new player.
        if self.pending_attack is not None:
            self.root.after_cancel(self.pending_attack)
            self.pending_attack = None

        # Reset both participants and return to the first turn.
        self.player_health = self.STARTING_HEALTH
        self.monster_health = self.STARTING_HEALTH
        self.turn = 1

        # Store the earliest turn when each special action is allowed.
        # Setting both to 1 makes them available at the beginning.
        self.strong_ready_turn = 1
        self.heal_ready_turn = 1

        # Clear the flags that would prevent the player from acting.
        self.game_over = False
        self.busy = False
        self.choosing_difficulty = True

        # Keep the last battle's difficulty selected for the next battle.
        self.scores_panel.pack_forget()
        self.difficulty_choice.set(self.difficulty)
        self.battle_panel.pack_forget()
        self.selection_panel.pack(fill="both", expand=True)
        self.restart_button.configure(text="Start Battle", command=self.start_battle)

        # Clear all battle messages.
        # In a Tkinter Text widget, "1.0" means line 1, character 0.
        self.log.configure(state="normal")
        self.log.delete("1.0", "end")
        self.log.configure(state="disabled")

        self.status_label.configure(text="Choose your action.")
        self.write_log("A monster approaches. The battle begins!")

        # Bring the new battle's health display back into view.
        self.content_canvas.yview_moveto(0)

        # Make the displayed values match the newly reset game.
        self.refresh_interface()

    def start_battle(self):
        # Copy the selection once. Combat uses these saved values, so the
        # difficulty cannot change halfway through a battle.
        if not self.choosing_difficulty:
            return
        selected = self.difficulty_choice.get()
        if selected not in self.DIFFICULTIES:
            return
        self.difficulty = selected
        self.strong_cooldown, self.heal_cooldown = self.DIFFICULTIES[selected]
        self.choosing_difficulty = False
        self.selection_panel.pack_forget()
        self.battle_panel.pack(fill="both", expand=True)
        self.restart_button.configure(text="New Game", command=self.new_game)
        self.content_canvas.yview_moveto(0)
        self.refresh_interface()
        self.root.update_idletasks()
        self.resize_content()
        self.attack_button.focus_set()

    def refresh_interface(self):
        # Update the visible text using the game's current values.
        # An f-string inserts values into text using {curly braces}.
        self.turn_label.configure(text=f"{self.difficulty}  |  Turn {self.turn}")

        self.player_label.configure(
            text=f"{self.player_name}    {self.player_health} / 100 health"
        )
        self.monster_label.configure(
            text=f"MONSTER    {self.monster_health} / 100 health"
        )

        # Change the filled amount of each health bar.
        self.player_bar["value"] = self.player_health
        self.monster_bar["value"] = self.monster_health

        # Subtract the current turn from each action's next available turn.
        # max(0, ...) prevents the displayed wait from becoming negative.
        strong_wait = max(0, self.strong_ready_turn - self.turn)
        heal_wait = max(0, self.heal_ready_turn - self.turn)

        # Show the remaining wait directly on unavailable action buttons.
        self.strong_button.configure(
            text=(
                "Strong Attack"
                if strong_wait == 0
                else f"Strong ({strong_wait} turns)"
            )
        )
        self.heal_button.configure(
            text=(
                "Heal"
                if heal_wait == 0
                else f"Heal ({heal_wait} turns)"
            )
        )

        # The player can act only if the game is still running
        # and the previous turn is not currently resolving.
        can_act = not self.choosing_difficulty and not self.game_over and not self.busy

        self.attack_button.configure(
            state="normal" if can_act else "disabled"
        )

        # Special actions must also have finished their cooldowns.
        self.strong_button.configure(
            state=(
                "normal"
                if can_act and strong_wait == 0
                else "disabled"
            )
        )
        self.heal_button.configure(
            state=(
                "normal"
                if can_act and heal_wait == 0
                else "disabled"
            )
        )

    def take_turn(self, action):
        # These checks protect the rules even if this method is called
        # when an action should not be allowed.
        # "return" stops the method immediately without advancing the turn.
        if self.choosing_difficulty or self.game_over or self.busy:
            return

        if action not in ("regular", "strong", "heal"):
            return

        if action == "strong" and self.turn < self.strong_ready_turn:
            return

        if action == "heal" and self.turn < self.heal_ready_turn:
            return

        # Lock combat controls until the player's action and monster's reply
        # have finished. This prevents rapid clicks from taking extra actions.
        self.busy = True
        self.write_log(f"\nTurn {self.turn}")

        if action == "regular":
            # randint includes both endpoints.
            # The * unpacks (6, 12) into two arguments: randint(6, 12).
            damage = random.randint(*self.REGULAR_DAMAGE)

            # Subtract damage, but display a minimum of zero health.
            # Damage that would take health below zero still defeats the monster.
            self.monster_health = max(
                0,
                self.monster_health - damage,
            )
            self.write_log(f"You attack for {damage} damage.")

        elif action == "strong":
            damage = random.randint(*self.STRONG_DAMAGE)
            self.monster_health = max(
                0,
                self.monster_health - damage,
            )

            # Start the strong attack's cooldown from this turn.
            self.strong_ready_turn = (
                self.turn + self.strong_cooldown
            )
            self.write_log(
                f"Your strong attack deals {damage} damage!"
            )

        elif action == "heal":
            amount = random.randint(*self.HEAL_AMOUNT)

            # Restore either the rolled amount or the missing health,
            # whichever is smaller. Health can never exceed 100.
            restored = min(
                amount,
                self.STARTING_HEALTH - self.player_health,
            )
            self.player_health += restored

            # Healing uses the turn and starts its own cooldown.
            self.heal_ready_turn = self.turn + self.heal_cooldown

            # Report the health actually restored, rather than the random roll.
            self.write_log(f"You restore {restored} health.")

        # Show the player's action before the monster responds.
        self.refresh_interface()

        # Check victory immediately so a defeated monster cannot retaliate.
        if self.monster_health <= 0:
            self.finish_game(player_won=True)
            return

        self.status_label.configure(
            text="The monster is attacking..."
        )

        # Schedule the monster's response in 600 milliseconds.
        # Unlike time.sleep(), after() keeps the window responsive.
        self.pending_attack = self.root.after(
            600,
            self.monster_attack,
        )

    def monster_attack(self):
        # The scheduled attack is now executing, so it is no longer pending.
        self.pending_attack = None

        # Do not attack if the game has already ended.
        if self.choosing_difficulty or self.game_over:
            return

        damage = random.randint(*self.MONSTER_DAMAGE)
        self.player_health = max(
            0,
            self.player_health - damage,
        )
        self.write_log(
            f"The monster attacks for {damage} damage."
        )

        # Zero health counts as defeat.
        if self.player_health <= 0:
            self.finish_game(player_won=False)
            return

        # Both participants survived, so begin the next player turn.
        # += 1 increases the turn number by one.
        self.turn += 1
        self.busy = False

        self.status_label.configure(text="Choose your action.")
        self.refresh_interface()

    def finish_game(self, player_won):
        # A finished battle must never be recorded a second time.
        if self.game_over:
            return
        # Mark combat as finished. refresh_interface() will disable attacks
        # and healing, while leaving the New Game button available.
        self.game_over = True
        self.busy = False

        # Choose the correct result based on who survived.
        result = (
            "You win! The monster has been defeated."
            if player_won
            else "The monster wins! You have been defeated."
        )

        # Show the result in both the log and the main status area.
        self.write_log(f"\n{result}")
        self.status_label.configure(
            text=(
                f"{result}\n"
                "Start a new game? Click New Game below."
            )
        )
        self.refresh_interface()

        # Move keyboard focus to New Game for convenient restarting.
        self.restart_button.focus_set()

        # The current turn includes the winning attack. Losses and
        # abandoned battles do not qualify for the leaderboard.
        if player_won:
            self.show_high_scores()

    def show_high_scores(self):
        try:
            scores = self.high_scores.record_win(self.player_name, self.turn)
            message = (
                f"{self.player_name} won in {self.turn} rounds!\n"
                "Best winning rounds per username. Fewer is better.\n"
                "All difficulties share this leaderboard."
            )
        except (OSError, ValueError) as error:
            # Keep the game usable if saving fails, without claiming success.
            scores = []
            message = (
                f"You won in {self.turn} rounds, but high scores could not be saved.\n"
                "Check the score file and folder permissions, then try after another win."
            )
            self.write_log(f"High-score file error: {error}")

        self.scores_message.configure(text=message)
        self.scores_text.configure(state="normal")
        self.scores_text.delete("1.0", "end")
        for rank, (name, rounds) in enumerate(scores, start=1):
            tag = "current_player" if name == self.player_name else ""
            self.scores_text.insert("end", f"{rank}.  {name} - {rounds} rounds\n", tag)
        self.scores_text.configure(state="disabled")
        self.scores_text.yview_moveto(0)
        self.scores_panel.pack(before=self.log_heading, fill="x", pady=(0, 18))

        # Automatically bring the updated leaderboard into view after a win.
        self.root.update_idletasks()
        self.resize_content()
        self.root.update_idletasks()
        offset = self.scores_panel.winfo_rooty() - self.content_panel.winfo_rooty()
        self.content_canvas.yview_moveto(offset / max(1, self.content_panel.winfo_height()))


# This block runs when this file is launched directly.
# It does not run if another Python file imports this one.
if __name__ == "__main__":
    # Hide the game window while the startup username dialog is open.
    window = tk.Tk()
    window.withdraw()

    # Ask once per program launch. Restarting a battle never runs this code.
    player_name = ask_player_name(window)
    if player_name is None:
        window.destroy()
    else:
        game = MonsterSlayer(window, player_name)
        window.deiconify()

        # The event loop responds to buttons, timers, and closing the window.
        window.mainloop()
