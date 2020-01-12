from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import apps.game.chat.routing
import os
import django
from channels.routing import get_default_application


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "PMMH.settings")
django.setup()
application = get_default_application()

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter(
            apps.game.chat.routing.websocket_urlpatterns
        )
    ),
})
