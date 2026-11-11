# GitHub-қа жүктеу және Coursera-ға тапсыру

Бұл ZIP ішінде қосымша коды да, JPG wireframe де бар. Жаңа репозиторийді GitHub веб-интерфейсінде бір рет ашу қажет.

1. https://github.com/new сайтына өтіңіз. **Owner:** `mrbekazz`. **Repository name:** `little-lemon-ios-capstone`. **Public** таңдаңыз. **Add a README file** белгіленбесін. **Create repository** басыңыз.
2. ZIP-ті ашыңыз (Extract All). Оның ішіндегі `App.js`, `src/`, `assets/`, `design/` және басқа файлдардың бәрі бір папкада қалсын.
3. Windows-та сол папкада терминал (PowerShell немесе Git Bash) ашып, келесіні орындаңыз:

```powershell
git init
git add .
git commit -m "Complete Little Lemon iOS capstone"
git branch -M main
git remote add origin https://github.com/mrbekazz/little-lemon-ios-capstone.git
git push -u origin main
```

Егер GitHub логинін сұраса, Git Credential Manager арқылы браузерде кіріңіз. `git` командасы табылмаса, алдымен Git for Windows орнатыңыз.

4. Мынаны ашып тексеріңіз: `https://github.com/mrbekazz/little-lemon-ios-capstone`. `design/wireframe-home.jpg` көрінуі керек.
5. Coursera / **My submission**:
   - **Project Title:** `Little Lemon iOS Developer Capstone`
   - **URL:** `https://github.com/mrbekazz/little-lemon-ios-capstone` (репозиторий шын мәнінде ашылып, код жүктелгеннен кейін ғана).
6. Кейін екі басқа студенттің жобасын тексеріп, критерий бойынша шынайы feedback беріңіз.

**Маңызды:** Бұл файлдар жаңа GitHub репозиторий жасалғанға дейін жергілікті ZIP ішінде сақталады. Тек ZIP-тің атын Coursera URL өрісіне жазуға болмайды.
