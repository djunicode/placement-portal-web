<p>
    <h1 align='center'> Placement Portal Project </h1>
</p>

<h4 align='center'> Repository for the Unicode 2020 project for Placement management. </h4>

<br>
<br>
<br>

## File Structure

```
.
├── LICENSE
├── README.md
├── placementApp/ -> Django app for endpoints
├── placementPortal -> Project configurations
├── manage.py
└── requirements.txt
```

## Technology Stack

#### Backend
- Django 3.0+ (Python 3.6+)
- Django REST Framework
- Djoser authentication library


## Build Instructions

#### Backend
```bash
  pip3 install -r requirements.txt
  python3 manage.py makemigrations
  python3 manage.py migrate
  python3 manage.py runserver
```

## Development Instructions

1. Before adding or commiting to git, please run `black .` inside this directory. This is important because we are using Black code formatter for this project

2. The database we are using is sqlite3 for the prototype. We may change it to PostgreSQL later.

#### Developers

1. Harsh Vartak (Backend)
2. Kanishk Shah (Backend)
3. Rayyan Merchant (Backend)
4. Sakshi Uppoor (Backend)


#### Mentors

1. Parag Vaid (Backend)
2. Preet Shah (Backend)


## License

> MIT License
> 
> Copyright (c) 2018 Unicode
> 
> Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
> 
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
