from datetime import date

from gramlot.showcase import ShowcasePage


class Page(ShowcasePage):
    def main(self, root):
        root.data('.booking.name', 'Ada')
        root.data('.booking.email', 'ada@example.com')
        root.data('.booking.code', 'ROMA26')
        root.data('.booking.guests', 2)
        root.data('.booking.day', date(2026, 10, 15))
        root.data('.booking.room', 'double')
        root.h1('Validate a booking')
        root.p('Edit a field, then move focus away to run its rules.', class_='lesson-lead')
        fields = root.formlet(col_min_width='220px', gap='14px', class_='lesson-card')
        fields.textBox(value='^.booking.name', lbl='Guest name', validate_notnull=True)
        fields.textBox(value='^.booking.email', lbl='Email',
                       validate_notnull=True, validate_email=True)
        fields.textBox(value='^.booking.code', lbl='Booking code',
                       validate_notnull=True, validate_len='4:8')
        fields.numberTextBox(value='^.booking.guests', lbl='Guests',
                             validate_notnull=True, validate_min=1, validate_max=6)
        fields.dateTextBox(value='^.booking.day', lbl='Arrival', validate_notnull=True)
        fields.filteringSelect(value='^.booking.room', lbl='Room',
                               values='single:Single,double:Double,suite:Suite')
        summary = root.groupBox(lbl='Booking summary', class_='lesson-preview')
        summary.p('^.booking.name', mask='Guest: %s')
        summary.p('^.booking.room', mask='Room code: %s')
        summary.p('^.booking.guests', mask='Guests: %s')
