# Social App - Backend

How to run:

1. Clone this repository
2. Run `npm i` to install all required dependencies
3. Setup the configuration in `.env` file (Example in `.env.example`)
4. Run `npm run dev` to serve

## Git branching

Setiap repository akan memiliki 3 branch utama, yaitu master, development, dan production.
Setiap pembuatan branch baru, buat branch baru dengan base master.
Format: `<tipe>/<judul>`

List tipe:

- Story, untuk fitur atau use case baru
- Task, untuk bug fixing, performance improvement, refactor, dsb.

Judul: gunakan kebab case

Contoh:

- story/api-attendance
- story/page-attendance
- task/improve-sql-performance-on-xxxx-method

Setelah selesai, Pull Request ke master dan wajib minta peer review ke kadiv/wakadiv.

## Code Styling & Repository

Sangat dimohon untuk memperhatikan hal-hal berikut:

1. Penamaan variabel, fungsi, dan kelas yang bermakna
2. Penyingkatan harus mudah ditebak dan masih terbaca
   - Misalkan, codeStylingAndRepository, terlalu panjang, disingkat menjadi: codeStyleNRepo
   - Yang Salah: csnr, cdStNrep
     3.Membuat kelas dengan pascal case (ClassName)
3. Membuat fungsi dan variable dengan camel case (fungsiDanVariabel)
4. Membuat folder dengan snake case (folder_styling)
5. Membuat file dengan kebab case (file-styling.tsx)
6. Membuat komponen React dan nama filenya dengan pascal case (NamaKomponen)

## Semantic Commit Message

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)

## Full SOP can be found here: [SOP Developers](https://docs.google.com/document/d/12Ko3DKYiEBoLxn1Z0gpVBmrNwEv4rm6LfWiPOCkqy00/edit#)
