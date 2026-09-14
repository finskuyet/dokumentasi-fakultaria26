import sys
import re

for filepath in [r"e:\project\fakultaria\index.html", r"e:\project\fakultaria\panitia.html"]:
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        text = f.read()

    # Find the length before
    old_len = len(text)
    
    # Remove Gallery Cards 1, 2, 3, 4, 5 exactly.
    # Note: the comment looks like <!-- Gallery Card 1: Opening -->
    # We use non-greedy .*?</article> to match till the end of the article.
    new_text = re.sub(r'\s*<!-- Gallery Card [12345]:.*?-->\s*<article.*?</article>', '', text, flags=re.DOTALL | re.IGNORECASE)
    
    new_len = len(new_text)
    print(f"{filepath}: removed {old_len - new_len} characters.")
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_text)
