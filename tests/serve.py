"""Local preview with a deterministic, read-only example bar inventory."""
import os
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith('/_a/p.gif'):
            self.send_response(204)
            self.end_headers()
            return
        if self.path == '/_a/bar/inventory':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(b'{"items":["tequila","simple-syrup","orange-bitters"]}')
            return
        return super().do_GET()

if __name__ == '__main__':
    root = str(Path(__file__).resolve().parents[1])
    port = int(os.environ.get('PORT', '8196'))
    print(f'Cocktail preview: http://127.0.0.1:{port}', flush=True)
    ThreadingHTTPServer(('127.0.0.1', port), partial(Handler, directory=root)).serve_forever()
