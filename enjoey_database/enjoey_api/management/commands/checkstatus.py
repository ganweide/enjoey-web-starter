from django.core.management.base import BaseCommand
from enjoey_api.management.commands.startscheduler import scheduler
import json

class Command(BaseCommand):
    help = "Check Status."

    def handle(self, *args, **options):
        is_running = scheduler.is_running if scheduler else False
        response_data = {'isRunning': is_running}
        print(json.dumps(response_data))
