# from django.core.management.base import BaseCommand
# from enjoey_api.management.commands.scheduler_manager import stop_scheduler

# class Command(BaseCommand):
#     help = "Stops the APScheduler."

#     def handle(self, *args, **options):
#         stop_scheduler('job1')
#         print("Scheduler stopped.")

from django.core.management.base import BaseCommand
from enjoey_api.management.commands.scheduler_manager import stop_scheduler

class Command(BaseCommand):
    help = "Stops the APScheduler for specific jobs."

    def add_arguments(self, parser):
        parser.add_argument('job', type=str, help='Job name (job1 or job2)')

    def handle(self, *args, **options):
        job_name = options['job']
        
        if job_name == 'job1':
            stop_scheduler(job_name)
        elif job_name == 'job2':
            stop_scheduler(job_name)
        else:
            print("Invalid job name. Use 'job1' or 'job2'.")
