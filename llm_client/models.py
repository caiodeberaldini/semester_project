import os
import sys

from anthropic import Anthropic

from dataclasses import dataclass

ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY")

class LLMClient:
    def __init__(self, model_name, system=None, api_key=ANTHROPIC_API_KEY):
        self.model_name = model_name
        self.client = Anthropic(api_key=api_key)
        self.chat = []

        if system:
            self.chat.append(MessageWrapper(role="system", message=system))

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
        in_messages = []
        system_prompt = ""

        for m in chat:
            if m.role == "system":
                system_prompt = m.message
            else:
                role = m.role
                content = []

                if m.message:
                    content.append({
                        "type": "text", 
                        "text": m.message
                    })
                in_messages.append({
                    "role": role,
                    "content": content
                })

        return in_messages, system_prompt

    def stream(
        self, 
        max_tokens, 
        temperature, 
        timeout, 
        text
    ):
        self.chat.append(MessageWrapper(role="user", message=text))
        in_messages, sys_prompt = self._build_input(self.chat)
        with self.client.with_options(timeout=timeout).messages.stream(
            model=self.model_name,
            max_tokens=max_tokens,
            system=sys_prompt,
            messages=in_messages,
            temperature=temperature,
            timeout=timeout,
        ) as stream:
            for text in stream.text_stream:
                self.chat.append(
                    MessageWrapper(
                        role="assistant",
                        message=text
                    )
                )
                yield text


@dataclass
class MessageWrapper:
    role: str
    message: str
