from django.conf.urls import include, url
from django.contrib import admin
from api import views as api_views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    # Examples:
    # url(r'^$', 'github_repo_stats.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),

    url(r'^$', api_views.render_landing_page),
    url(r'^get_stats/$', api_views.get_stats),

    # rest framework urls
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

