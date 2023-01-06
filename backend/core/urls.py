"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/howto/deployment/wsgi/
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import TokenRefreshView
from .views import Registration, MyTokenObtainPairView

from apps.players.urls import router_players

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/register/', Registration.as_view(),
         name='registration'),

    path('api/token/', MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),

    path('api/token/refresh/', TokenRefreshView.as_view(),
         name='token_refresh'),

    path('api/profile/', include('apps.user_profiles.urls')),

    path('api/players/', include(router_players.urls)),

    path('api/', include('apps.tournaments.urls')),

    # frontend URLs for production build.
    re_path(".*", TemplateView.as_view(template_name="index.html"))
]
