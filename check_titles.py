import re
with open(r'e:\project\fakultaria\index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# find all gallery card titles
titles = re.findall(r'<h3 class="font-bold[^>]*>(.*?)</h3>', text)
print("Remaining titles in index.html:")
for t in titles:
    print("- " + t)
