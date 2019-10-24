# ProjectMagic-MightofHeroes

## Requriments
Python 3.6.8(recomended)
virtualenv

## To prepere environment
<code>
virtualenv -p /usr/bin/python3 venv
pip install -r PMMH/requirements.txt
</code>

## To apply DB changes
<code>
python PMMH/manage.py migrate
</code>

## To activate venv
<code>
source PMMH/venv/bin/activate
</code>

## To run project
<code>
python PMMH/manage.py runserver
</code>
