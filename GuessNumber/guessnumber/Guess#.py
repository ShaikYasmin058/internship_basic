import tkinter as tk
import random

class NumberGuessApp:
    def __init__(self, master):
        self.master = master
        self.master.title("🎯 Number Guess Game")
        self.master.geometry("400x360")
        self.master.configure(bg="#e6f7ff")

        self.number = random.randint(1, 100)
        self.attempts_left = 7

        self.create_widgets()

    def create_widgets(self):
        self.frame = tk.Frame(self.master, bg="white", bd=2, relief="ridge")
        self.frame.pack(padx=20, pady=20, fill="both", expand=True)

        tk.Label(self.frame, text="🎯 Number Guess Game", font=("Segoe UI", 16, "bold"), bg="white").pack(pady=10)
        tk.Label(self.frame, text="Guess a number between 1 and 100", font=("Segoe UI", 12), bg="white").pack()

        self.entry = tk.Entry(self.frame, font=("Segoe UI", 14), justify='center')
        self.entry.pack(pady=10)

        self.message_label = tk.Label(self.frame, text="", font=("Segoe UI", 12, "bold"), fg="black", bg="white")
        self.message_label.pack(pady=5)

        self.attempts_label = tk.Label(self.frame, text=f"🎮 Attempts Left: {self.attempts_left}", font=("Segoe UI", 12), bg="white")
        self.attempts_label.pack()

        btn_frame = tk.Frame(self.frame, bg="white")
        btn_frame.pack(pady=10)

        tk.Button(btn_frame, text="Submit", bg="#007bff", fg="white", width=10, command=self.check_guess).pack(side="left", padx=5)
        tk.Button(btn_frame, text="🔄 Restart", bg="#28a745", fg="white", width=10, command=self.restart_game).pack(side="left", padx=5)

    def check_guess(self):
        guess_text = self.entry.get()
        if not guess_text.isdigit():
            self.message_label.config(text="⚠️ Enter a valid number between 1 and 100!")
            return

        guess = int(guess_text)
        if guess < 1 or guess > 100:
            self.message_label.config(text="⚠️ Out of range! Try 1–100.")
            return

        self.attempts_left -= 1
        self.attempts_label.config(text=f"🎮 Attempts Left: {self.attempts_left}")

        if guess == self.number:
            self.message_label.config(text=f"🎉 Correct! The number was {self.number}")
            self.entry.config(state="disabled")
        elif self.attempts_left == 0:
            self.message_label.config(text=f"😢 Out of attempts! The number was {self.number}")
            self.entry.config(state="disabled")
        elif guess < self.number:
            self.message_label.config(text="📉 Too low! Try again.")
        else:
            self.message_label.config(text="📈 Too high! Try again.")

    def restart_game(self):
        self.number = random.randint(1, 100)
        self.attempts_left = 7
        self.entry.config(state="normal")
        self.entry.delete(0, tk.END)
        self.message_label.config(text="")
        self.attempts_label.config(text=f"🎮 Attempts Left: {self.attempts_left}")

# Run the game
if __name__ == "__main__":
    root = tk.Tk()
    app = NumberGuessApp(root)
    root.mainloop()
