"""English user documentation; builds without importing optional server packages."""
from pathlib import Path
import tomllib

project = 'Gramlot'
author = 'Gramlot Team'
copyright = '2026, Softwell S.r.l.'
release = tomllib.loads((Path(__file__).parents[2] / 'pyproject.toml').read_text())['project']['version']
language = 'en'
extensions = []
root_doc = 'index'
exclude_patterns = []
nitpicky = True
html_theme = "sphinx_rtd_theme"
html_logo = '../../assets/gramlot-logo.png'
html_static_path = ['_static']
html_css_files = ['custom.css']
html_theme_options = {"style_nav_header_background": "#2980b9"}
html_title = f'Gramlot {release} documentation'
