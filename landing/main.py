import os
import logging

from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
from google.appengine.ext.webapp import template
from google.appengine.api import memcache


def is_debug():
  if os.environ['SERVER_SOFTWARE'].startswith('Dev'):
    return True
  else:
    return False
    

class BasePageHandler(webapp.RequestHandler):
  
  def get(self):
    page = memcache.get(self.get_filename())
    if is_debug(): 
      page = None
    if page is None:
      path = os.path.join(os.path.dirname(__file__), 'templates/' + self.get_filename())
      page = template.render(path, {})
      memcache.set(self.get_filename(), page, 60*1)
    self.response.out.write(page)
  
  def post(self):
    self.get()
  
          
class IndexHandler(BasePageHandler):
  def get_filename(self):
    return 'index.html'
    
    
def main():
    application = webapp.WSGIApplication([('/', IndexHandler)],
                                         debug=True)
    util.run_wsgi_app(application)

if __name__ == '__main__':
    main()