import os
import sys

from anthropic import Anthropic

ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY")

class LLMClient:
    def __init__(self, name, api_key=ANTHROPIC_API_KEY):
        self.model_name = name
        self.client = Anthropic(api_key=api_key)

    def __call__(self, prompt):
        message = self.client.messages.create(
            model=self.model_name, 
            max_tokens=1024,
            messages=[
                {"role": "user", "content": "Hello, Claude!"}
            ]
        )

        print(message.content)


    def _build_input(self, chat):
        return chat

    def stream(self, 
        max_tokens, 
        temperature, 
        system, 
        timeout, 
        chat
    ):
        in_messages = chat
        with self.client.with_options(timeout=timeout).messages.stream(
            model=self.model_name,
            max_tokens=max_tokens,
            system=system,
            messages=in_messages,
            temperature=temperature,
            timeout=timeout,
        ) as stream:
            for text in stream.text_stream:
                yield text