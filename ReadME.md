## Semester Project

Repo for the project of the class *Software Engineering for Data Science*

---

**AI Codebase Assistant**\
**Goal:** Create a browser plugin that can help you navigate through other people's code through natural language queries\
**Achievability:** Probably achievable\
**Source of data:** GitHub public codebases\
**Main computation:** Not intensive\
**Features of the project:** A browser plugin with an interactive UI so that the user can ask questions and retrieve information from the codebase, without having to dive into it


---

Challenges:

 - Extract the repo dir structure\
    Solutions:
    1. Scrap the webpage (hard)
    2. Clone the repo and create the dir structure using `tree` package (easy/medium)

- Use the dir structure as a context for the LLM

- Make the LLM infer which file might be the right one to an user's prompt