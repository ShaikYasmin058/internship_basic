from flask import Flask, render_template, request, session, redirect, url_for
import random

app = Flask(__name__)
app.secret_key = "your_secret_key"

# In-memory leaderboard
leaderboard = []

@app.route("/", methods=["GET"])
def index():
    if "number" not in session or "attempts" not in session:
        session["number"] = random.randint(1, 100)
        session["attempts"] = 7
        session["name"] = ""

    return render_template(
        "index.html",
        message="Guess a number between 1 and 100!",
        attempts=session["attempts"],
        leaderboard=leaderboard
    )

@app.route("/guess", methods=["POST"])
def guess():
    if "attempts" not in session or "number" not in session:
        return redirect(url_for("index"))  # reinitialize if not set

    guess = int(request.form["guess"])
    name = request.form.get("name", "Anonymous").strip() or "Anonymous"
    session["name"] = name
    session["attempts"] -= 1

    if guess == session["number"]:
        message = f"🎉 Correct! {name} guessed it in {7 - session['attempts']} attempts."
        leaderboard.append((name, 7 - session["attempts"]))
        leaderboard.sort(key=lambda x: x[1])
        leaderboard[:] = leaderboard[:5]  # Top 5 only
        return redirect(url_for("restart", won="yes", message=message))

    elif session["attempts"] <= 0:
        message = f"❌ Out of attempts! The number was {session['number']}."
        return redirect(url_for("restart", won="no", message=message))

    elif guess < session["number"]:
        message = "📉 Too low!"
    else:
        message = "📈 Too high!"

    return render_template(
        "index.html",
        message=message,
        attempts=session["attempts"],
        leaderboard=leaderboard
    )

@app.route("/restart")
def restart():
    msg = request.args.get("message", "Game restarted. Try again!")
    session["number"] = random.randint(1, 100)
    session["attempts"] = 7
    return render_template(
        "index.html",
        message=msg,
        attempts=session["attempts"],
        leaderboard=leaderboard
    )

if __name__ == "__main__":
    app.run(debug=True)
