from django.core.mail import send_mail
from django.template import engines
from django.http import JsonResponse
from django.conf import settings

def my_job():
    # Your job logic here
    print("Hello World")

def my_job2():
    print("Hello World 2")

def send_email_template(request):
    # Get the uploaded template file from the request
    uploaded_template = request.FILES.get('html')
    print("Here 1")
    # Load the Jinja2 template
    if uploaded_template:
        template_content = uploaded_template.read().decode('utf-8')
    else:
        return JsonResponse({'success': False, 'error': 'No template file provided'})
    print("Here 2")
    
    env = engines['django']
    index_template = env.from_string(template_content)
    print("Here 3")
    
    # Define email subject and body
    SUBJECT = 'Welcome to En-Joey Family'
    recipient = 'vinoth@visualogic.com.my'  # Replace with recipient's email
    print("Here 4")
    
    # Render the template without any required context
    body_html = index_template.render()
    
    # Get the email settings from settings.py
    email_from = settings.EMAIL_HOST_USER
    
    try:
        send_mail(SUBJECT, body_html, email_from, [recipient], html_message=body_html)
        return JsonResponse({'success': True, 'message': 'Email sent successfully'})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)})
    # if request.method == 'POST' and request.FILES.get('html'):
    #     html_file = request.FILES['html']
    #     email_subject = 'Email Template'
    #     email_body = 'This is the email template content.'
    #     recipient_email = 'weide1012@gmail.com'

    #     try:
    #         send_mail(email_subject, email_body, settings.DEFAULT_FROM_EMAIL, [recipient_email], html_message=html_file.read().decode())
    #         return JsonResponse({'success': True, 'message': 'Email template sent successfully'})
    #     except Exception as e:
    #         return JsonResponse({'success': False, 'error': str(e)})
    # else:
    #     return JsonResponse({'success': False, 'error': 'No HTML file provided'})