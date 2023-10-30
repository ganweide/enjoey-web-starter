# stopscheduler.py
from django.core.management.base import BaseCommand
from enjoey_api.management.commands.startscheduler import scheduler  # Import the scheduler variable from startscheduler.py

class Command(BaseCommand):
    help = "Stops the APScheduler."

    def handle(self, *args, **options):
        if scheduler is not None:
            scheduler.shutdown()
