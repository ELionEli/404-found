import torch
import json
from transformers import pipeline
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.post('/feelings')
def suggest():
    data = json.dumps(request.json)
    print(data)
    suggestion = SuggestAI()
    return suggestion.prompt(data)

class SuggestAI:
    llm_pipeline = pipeline("text-generation", model="TinyLlama/TinyLlama-1.1B-Chat-v1.0", torch_dtype=torch.bfloat16, device_map="auto")

    def prompt(self, prompt):
        
        messages = [
            {
                "role": "system",
                "content": (
                    "Suggest activities to help the user feel better based on the user's mood. "
                ),
                
            },
            {"role": "user", "content": prompt},
        ]
        prompt = self.llm_pipeline.tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
        outputs = self.llm_pipeline(prompt, max_new_tokens=256, do_sample=True, temperature=0.7, top_k=50, top_p=0.95)
        return (outputs[0]["generated_text"])


