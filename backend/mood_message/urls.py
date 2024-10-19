from django.urls import include, path
from rest_framework.routers import DefaultRouter

from mood_message.views import MessageViewSet

# Create a router and register the MessageViewSet
router = DefaultRouter()
router.register(r"messages", MessageViewSet)

# Wire up the API using automatic URL routing
urlpatterns = [
    path("", include(router.urls)),  # Include the router URLs
]
