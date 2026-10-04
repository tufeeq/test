#!/bin/bash
# assemble the app and copy content/audio from the content workspace
set -e
cd "$(dirname "$0")"
node tools/xpmeta.js > src/09a-xpmeta.js
for f in xpsrc/*.js; do node --check "$f"; done
cat src/*.js > public/app.js
node --check public/app.js
mkdir -p public/content content-pro public/audio/sp
C=/home/claude/ielts/content
for f in skills/skills skills/techniques skills/drills listening/L01 reading/A01 reading/G01 writing/task1_academic writing/task1_gt writing/task2 speaking/part1 speaking/part23 vocab/academic vocab/topics vocab/paraphrase lessons/lessons errors/arab_errors; do
  python3 -c "import json,sys;json.dump(json.load(open('$C/$f.json')),open('public/content/'+'$f'.split('/')[1]+'.json','w'),ensure_ascii=False,separators=(',',':'))"
done
for f in listening/L02 listening/L03 listening/L04 reading/A02 reading/A03 reading/A04 reading/G02; do
  python3 -c "import json;json.dump(json.load(open('$C/$f.json')),open('content-pro/'+'$f'.split('/')[1]+'.json','w'),ensure_ascii=False,separators=(',',':'))"
done
cp /home/claude/ielts/audio/*.mp3 /home/claude/ielts/audio/*.timing.json public/audio/ 2>/dev/null || true
cp /home/claude/ielts/audio/sp/*.mp3 public/audio/sp/ 2>/dev/null || true
mkdir -p public/audio/dr && cp /home/claude/ielts/audio/dr/*.mp3 public/audio/dr/ 2>/dev/null || true
echo built $(wc -c < public/app.js) bytes
