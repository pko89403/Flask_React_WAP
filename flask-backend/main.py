from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

from flask_cors import CORS
from flask import Flask, request, render_template, json, jsonify, send_from_directory
import json
import numpy as np
import io
import re

import keras
from keras_preprocessing import text



app = Flask("__main__")
#app.use_x_sendfile=True
CORS(app)

tokenizer = None
def input_Text_proc(text_Data):
	text_Data = text_Data.strip()
	text_Data = re.split('; |, |\*|\n| |', text_Data)
	print(text_Data)
	global tokenizer
	if tokenizer is None:
		print('Tokenizer is Loaded')
		with open('./Tokenizer/tokenizer2.json') as f:
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
# Loading Tensorflow Model
# access to "/model" connect the static files 

WEIGHT_PATH = ''
@app.route("/modelBOW1")
def model1():
	global WEIGHT_PATH
	WEIGHT_PATH = './LSTM_NE_HypOpt/model/'
	json_data = json.load(open( WEIGHT_PATH + 'model.json' ))
	return jsonify(json_data)

@app.route("/modelBOW2")
def model2():
	global WEIGHT_PATH
	WEIGHT_PATH = './DNN_NE_HypOpt/model/'
	json_data = json.load(open( WEIGHT_PATH + 'model.json' ))
	return jsonify(json_data)

@app.route("/modelEMB")
def model3():
	global WEIGHT_PATH
	WEIGHT_PATH = './1D_YoonKim_Model/model/'
	json_data = json.load(open( WEIGHT_PATH + 'model.json' ))
	return jsonify(json_data)

# Loading Tensorflow weights
# access to "/<path:path>"
@app.route('/<path:path>')
def load_shards(path):
	global WEIGHT_PATH
	return send_from_directory(WEIGHT_PATH, path)


app.run(host='0.0.0.0', port=80, debug=True, threaded=True, ssl_context=("./sslkey/cert.pem", "./sslkey/key.pem"))
