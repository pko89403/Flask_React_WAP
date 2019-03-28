from flask_cors import CORS
from flask import Flask, request, render_template, json, jsonify, send_from_directory
import json
import numpy as np
import io
import re
from keras_preprocessing import text

app = Flask("__main__")
CORS(app)


tokenizer = None
def input_Text_proc(text_Data):
	text_Data = text_Data.strip()
	text_Data = re.split('; |, |\*|\n| |', text_Data)
	print(text_Data)
	global tokenizer
	if tokenizer is None:
		print('Tokenizer is Loaded')
		with open('./2D_YoonKim/tokenizer_maxLen30.json') as f:
			token_json = json.load(f)
			tokenizer = text.tokenizer_from_json( token_json )
	
	res = [[]]
	for w in text_Data:
		w = w.lower()
		if w not in tokenizer.word_index:
			res[0].append(0)
		else:
			res[0].append(tokenizer.word_index[w])
	print(res)
	return	res	


@app.route("/")
def my_index():
	return render_template("index.html")

@app.route("/getData", methods=['POST'])
def test():
	data = (request.data).decode("utf-8")
	print(data)
	with open('./UserInputs/input.log', 'a') as outfile:
		json.dump(data, outfile)
		
	res = input_Text_proc(data)
	return jsonify(res)

@app.route("/model")
def model():
	json_data = json.load(open('./2D_YoonKim/model/model.json'))
	return jsonify(json_data)

@app.route('/<path:path>')
def load_shards(path):
        return send_from_directory('./2D_YoonKim/model/', path)


app.run(host='0.0.0.0', port=80, debug=True)
