import sys
import stanza

# stanza.download('en')
nlp = stanza.Pipeline(lang='en', processors='tokenize,ner')

text = sys.argv[1]
doc = nlp(text)
for ent in doc.ents:
    if ent.type == 'PERSON':
        print("You may leak 'name' information.")
    if ent.type == 'MONEY':
        print("You may leak 'money' information.")
    if ent.type == 'LOC':
        print("You may leak 'location' information.")