FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html
# Build files shouldn't be served as web pages.
RUN rm -f /usr/share/nginx/html/nginx.conf /usr/share/nginx/html/dockerfile /usr/share/nginx/html/.gitignore
