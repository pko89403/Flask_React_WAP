import json
import io

json_data = json.load(open("./tokenizer2.json"))
print(json_data)
print(json_data["word_index"])

