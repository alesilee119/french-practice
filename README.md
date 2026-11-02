# French Practice (Bonjour!)
A beginner French practice web app for iPhone: words with audio, verb tenses, flashcards and quizzes. Works offline after the first visit.

## Install on iPhone
1. Open https://alesilee119.github.io/french-practice/ in **Safari**.
2. Tap **Share** → **Add to Home Screen** → **Add**.
3. Open it from the home screen icon.
4. Turn off **silent mode** (the side switch) so you can hear the voice. For better voices: Settings › Accessibility › Spoken Content › Voices › French.

## Sync with the Google Sheet
Words from the Google Sheet (Alesi_Dict_updated.xlsx) appear under Words as Alphabet, Numbers (sheet) and My vocabulary.
To re-sync after editing the sheet: download it as .xlsx and run
`python3 scripts/sync_sheet.py --xlsx Alesi_Dict_updated.xlsx --commit`
(needs `pip install openpyxl edge-tts`). It rebuilds `sheet.js` and makes audio (fr-FR-DeniseNeural) for any new word.
