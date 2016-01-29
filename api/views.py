from django.shortcuts import render, render_to_response
from django.template import RequestContext

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer

from django.conf import settings
from api.utils import get_request_content, find_open_issues, find_open_issues_24h_7days, \
						find_open_issues_7days, find_open_issues_24h, clean_url, generate_github_api_url
from urlparse import urlparse
import json, urllib2, logging

logger = logging.getLogger(__name__)

# Create your views here.
# renders landing page
def render_landing_page(request, template="templates/web/landing_page.html"):
	"""
	Renders landing page
	"""
	#logger.debug("Landing page rendered!")
	return render(request, template, context_instance=RequestContext(request))


# takes a public repo url, fetches stats
@api_view(['POST'])
def get_stats(request):

	valid_data, data = get_request_content("get_stats", request, None, ['url'])
	resp_data = {}

	if valid_data:
		
		api_url, repo_url = generate_github_api_url(data['url'])
		logger.debug("Api url: %s" %api_url)
		
		# fetch issues
		try:			
			issues_objects = urllib2.urlopen(api_url)
		except:			
			return Response(status=status.HTTP_400_BAD_REQUEST)
		else:
			
			# check for api status code
			if (issues_objects.getcode()==200):
				issues_dict = json.load(issues_objects)				

				t1 = len(issues_dict)
				t2 = find_open_issues(issues_dict)
				t3 = find_open_issues_24h(issues_dict)
				t4 = find_open_issues_24h_7days(issues_dict)
				t5 = find_open_issues_7days(issues_dict)

				resp_data = {
					"total_issues": t1,
					"total_open_issues": t2,
					"open_issues_24h": t3,
					"open_issues_24h_7days": t4,
					"open_issues_7days": t5,
					"repo_url": repo_url,
				}

				logger.debug("%s" %(resp_data))


				return Response(status=status.HTTP_200_OK, data=resp_data)

			else:
				logger.error("Github api returned code: %s" %issues_objects.getcode())
				return Response(status=status.HTTP_400_BAD_REQUEST)

	# invalid data in request
	else:
		logger.debug("Invalid data in request")
		return Response(status=status.HTTP_400_BAD_REQUEST)
