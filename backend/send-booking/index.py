import json
import os
import smtplib
import urllib.request
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from html import escape


def send_email(name: str, phone: str, service: str) -> None:
    email_to = os.environ['EMAIL_TO']
    smtp_host = os.environ.get('SMTP_HOST', 'smtp.mail.ru')
    smtp_port = int(os.environ.get('SMTP_PORT', '465'))
    smtp_user = os.environ['SMTP_USER'].strip()
    smtp_pass = os.environ['SMTP_PASS'].replace(' ', '').strip()

    html_body = f"""
    <h2>Новая заявка с сайта</h2>
    <table style="border-collapse:collapse;width:100%;max-width:500px;">
      <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Имя</td><td style="padding:8px;">{escape(name)}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Телефон</td><td style="padding:8px;">{escape(phone)}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Услуга</td><td style="padding:8px;">{escape(service) or 'не указана'}</td></tr>
    </table>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта: {name}'
    msg['From'] = smtp_user
    msg['To'] = email_to
    msg.attach(MIMEText(html_body, 'html', 'utf-8'))

    with smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=10) as server:
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, email_to, msg.as_string())


def send_telegram(name: str, phone: str, service: str) -> None:
    token = os.environ['TELEGRAM_BOT_TOKEN'].strip()
    chat_id = os.environ['TELEGRAM_CHAT_ID'].strip()
    text = (
        '<b>Новая заявка с сайта</b>\n\n'
        f'<b>Имя:</b> {escape(name)}\n'
        f'<b>Телефон:</b> {escape(phone)}\n'
        f'<b>Услуга:</b> {escape(service) or "не указана"}'
    )
    payload = json.dumps({'chat_id': chat_id, 'text': text, 'parse_mode': 'HTML'}).encode('utf-8')
    req = urllib.request.Request(
        f'https://api.telegram.org/bot{token}/sendMessage',
        data=payload,
        headers={'Content-Type': 'application/json'},
    )
    with urllib.request.urlopen(req, timeout=10) as resp:
        resp.read()


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта на email и дублирует её в Telegram."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '')
    phone = body.get('phone', '')
    service = body.get('service', '')

    results = {}
    for channel, sender in (('email', send_email), ('telegram', send_telegram)):
        try:
            sender(name, phone, service)
            results[channel] = 'ok'
        except Exception as e:
            print(f'{channel} error: {e}')
            results[channel] = 'error'

    ok = 'ok' in results.values()
    return {
        'statusCode': 200 if ok else 502,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': ok, 'channels': results})
    }
