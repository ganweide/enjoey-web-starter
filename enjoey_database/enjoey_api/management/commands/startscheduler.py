# from django.core.management.base import BaseCommand
# from enjoey_api.management.commands.scheduler_manager import start_scheduler

# class Command(BaseCommand):
#     help = "Starts the APScheduler."

#     def handle(self, *args, **options):
#         scheduler = start_scheduler('job1')
#         if scheduler is not None:
#             print("Scheduler started.")
#         else:
#             print("Scheduler is already running.")

from django.core.management.base import BaseCommand
from enjoey_api.management.commands.scheduler_manager import start_scheduler

class Command(BaseCommand):
    help = "Starts the APScheduler for specific jobs."

    def add_arguments(self, parser):
        parser.add_argument('job', type=str, help='Job name (job1 or job2)')

    def handle(self, *args, **options):
        job_name = options['job']
        
        if job_name == 'job1':
            start_scheduler(job_name)
        elif job_name == 'job2':
            start_scheduler(job_name)
        else:
            print("Invalid job name. Use 'job1' or 'job2'.")

