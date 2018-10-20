#THIS IS THE INFRASTRUCTURE FILE#

#TEST COMMIT
from flask import Flask

app = Flask(__name__)

@app.route("/")
def test():
	return "Welcome to my Flask page!"

app.run(debug=True, host ="0.0.0.0", port=80)
