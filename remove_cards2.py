import sys
import re

for filepath in [r"e:\project\fakultaria\index.html", r"e:\project\fakultaria\panitia.html"]:
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    # The exact substrings that uniquely identify the cards to remove:
    markers = [
        "Euforia Grand Opening",
        "Hackathon &amp; UI/UX",
        "Turnamen E-Sports",
        "Pameran Media Komunikasi",
        "Talkshow Nasional"
    ]
    
    # We will find every block that starts with <!-- Gallery Card ... --> and ends with </article>
    # and if it contains any of the markers, we remove it.
    
    def repl(m):
        content = m.group(0)
        for marker in markers:
            if marker in content:
                print(f"Removing card containing: {marker}")
                return ''
        return content

    # Match <!-- Gallery Card ... --> followed by <article ...> ... </article>
    # Use .*? to be non-greedy.
    new_text = re.sub(r'\s*<!--\s*Gallery Card[^\n]*?-->\s*<article.*?</article>', repl, text, flags=re.DOTALL | re.IGNORECASE)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_text)

print("Done.")
