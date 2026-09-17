"""Focused, progressive catalog for the packaged Gramlot showcase."""
from gramlot.showcase import ShowcaseCatalog, ShowcaseLesson


LESSONS = (
    ShowcaseLesson('overview', '00 · Overview', '', 0,
                   'Practical steps through forms, local logic and server calls.'),
    ShowcaseLesson('hello_static', '01 · Hello world', '', 10,
                   'Start with the smallest possible Gramlot interface.', ('Source',)),
    ShowcaseLesson('hello_binding', '02 · Live greeting', '', 20,
                   'Connect several controls and a preview through Data.', ('Data', 'binding')),
    ShowcaseLesson('dynamic_label_position', '03 · Label playground', 'Build forms', 30,
                   'Explore shared label position and color across a small form.',
                   ('lbl', 'lbl_position', 'lbl_color')),
    ShowcaseLesson('input_widgets', '04 · Input widgets', 'Build forms', 40,
                   'Use typed, numeric and selection controls in one bound formlet.',
                   ('formlet', 'inputs', 'binding')),
    ShowcaseLesson('number_format', '05 · Format values', 'Build forms', 50,
                   'Present stored numbers and dates without changing their Data values.',
                   ('format', 'locale', 'mask')),
    ShowcaseLesson('formlet', '06 · Compose a form', 'Build forms', 60,
                   'Combine group boxes and formlets into a readable contact profile.',
                   ('groupBox', 'formlet')),
    ShowcaseLesson('required_validation', '07 · Validate a booking', 'Put it together', 70,
                   'Build a useful booking form with required, email, length and range rules.',
                   ('validate_notnull', 'validate_email', 'validate_len', 'validate_min')),
    ShowcaseLesson('data_formula', '08 · Data formulas', 'Data and logic', 80, 'Calculate dependent values.', ('dataFormula',)),
    ShowcaseLesson('data_controller', '09 · Data controllers', 'Data and logic', 90, 'React and write multiple values.', ('dataController',)),
    ShowcaseLesson('data_rpc', '10 · Data RPC', 'Data and logic', 100, 'Call a real Python endpoint.', ('dataRpc',)),
)

CATALOG = ShowcaseCatalog(LESSONS, default='overview')
