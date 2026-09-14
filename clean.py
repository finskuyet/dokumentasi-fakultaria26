import re, sys

def clean(fpath):
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Matches original cards 1, 2, 3, 4, 5. Note that the custom ones have 3.5, 5.5 etc or we can just match exact strings.
    # We want to remove the ones shown in the picture and the other templates.
    # Let's match by title to be super safe.
    titles_to_remove = [
        'Opening Ceremony', 'Hackathon', 'E-Sport Championship',
        'Pameran Media Komunikasi', 'Talkshow Nasional',
    ]
    
    new_content = content
    for t in titles_to_remove:
        # Find the article that contains this title
        pattern = r'\s*<!-- [^\n]*? -->\s*<article[^>]*>.*?' + t + r'.*?</article>'
        new_content = re.sub(pattern, '', new_content, flags=re.IGNORECASE | re.DOTALL)
        
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Cleaned {fpath}, removed {len(content) - len(new_content)} characters")

clean(r'e:\project\fakultaria\index.html')
clean(r'e:\project\fakultaria\panitia.html')
