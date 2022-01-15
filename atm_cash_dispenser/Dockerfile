FROM python:3.8.8

WORKDIR /atm_cash_dispenser

COPY . .

RUN pip install -r requirements.txt

EXPOSE 3002

CMD ["python", "./main.py"]