# Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
"""Italian presentation guide to the owner's seven integration scenarios."""
from genro_toolbox import metadata
from gramlot.page import WebPage


SCENARIOS = (
    ('FastAPI senza database', 'FastAPI → Gramlot', 'Disponibile',
     'Mostrare componenti, binding, tutorial e interazioni senza dipendere da un database.',
     'Il server FastAPI ospita le pagine Gramlot. I dati degli esempi possono essere locali o in memoria.',
     'Il sito esempi supporta questo avvio. La demo attuale sulla porta 8051 include anche il database dello scenario 2.',
     'Preparare un profilo di avvio dedicato senza GnrApp e una selezione chiara degli esempi autonomi.'),
    ('FastAPI con database Genropy', 'FastAPI → Gramlot + GnrApp → DB Genropy', 'Demo attiva · 8051',
     'Usare il modello dati Genropy in un sito ospitato da FastAPI.',
     'L’adapter collega le pagine Gramlot a GnrApp e al database dell’istanza test_invoice_pg.',
     'Sono disponibili gli esempi con stati, località, clienti e selettori collegati al database reale.',
     'Consolidare configurazione e avvio nel progetto gramlot-fastapi, distinguendo questo profilo da quello senza DB.'),
    ('Genro ASGI senza database', 'Genro ASGI → Gramlot', 'Prototipo esistente',
     'Ospitare un’applicazione Gramlot su Genro ASGI senza richiedere il database Genropy.',
     'Genro ASGI gestisce il server; Gramlot costruisce l’interfaccia e le sue interazioni.',
     'Esiste un prototipo locale dell’interfaccia di gestione del server. Non è uno dei tre siti avviati per questa presentazione.',
     'Organizzare un sito dimostrativo riproducibile nel progetto gramlot-genro-asgi.'),
    ('Genro ASGI con database Genropy', 'Genro ASGI → Gramlot + GnrApp → DB Genropy', 'Da organizzare e verificare',
     'Combinare l’hosting Genro ASGI con l’accesso al modello dati Genropy.',
     'Questo scenario aggiunge l’integrazione dati al precedente; non richiede di montare l’intera applicazione Genropy classica.',
     'È uno scenario richiesto: la demo FastAPI con database non dimostra automaticamente questa integrazione.',
     'Definire configurazione di GnrApp, gestione delle richieste e verifiche degli esempi DB su questo host.'),
    ('Genropy classico con Gramlot', 'Genropy classico / WSGI → pagine Gramlot → DB Genropy', 'Prototipo locale',
     'Aggiungere pagine Gramlot a un’applicazione Genropy tradizionale.',
     'Il sito Genropy esistente rimane l’host e mette a disposizione contesto applicativo e database.',
     'Esistono prove isolate con Hello World, selezione clienti e griglia stati. Il prototipo riguarda pagine pubbliche e letture dal DB.',
     'Consolidare l’adapter e verificare autorizzazioni delle pagine e delle RPC, oltre alle operazioni di scrittura.'),
    ('Genropy su Genro ASGI con Gramlot', 'Genro ASGI → applicazione Genropy → pagine Gramlot', 'Da organizzare e verificare',
     'Mostrare un’applicazione Genropy montata su Genro ASGI che contiene pagine Gramlot.',
     'Qui viene ospitata l’applicazione Genropy, con il suo contesto. È diverso dal solo accesso a GnrApp dello scenario 4.',
     'È uno scenario richiesto; questa presentazione non ne certifica ancora il funzionamento completo.',
     'Preparare il montaggio dell’applicazione e verificare routing, sessioni, autorizzazioni e accesso al database.'),
    ('Django con Gramlot · Bakery', 'Django / Bakery → pagine Gramlot → dati Django', 'Demo attiva · 8063',
     'Integrare Gramlot in un’applicazione Django esistente, usando Bakery come esempio.',
     'Django mantiene applicazione e modello dati; Gramlot fornisce le pagine e i componenti interattivi.',
     'La demo Bakery è avviata separatamente ed è disponibile nella pagina di esplorazione dei prodotti.',
     'Trasferire e documentare l’integrazione nel progetto gramlot-django, con un avvio riproducibile.'),
)


@metadata(title='I sette scenari Gramlot')
class Page(WebPage):
    def main(self, root):
        root.styleSheet('''
            body { margin:0; background:#f3f6fb; color:#172d43; font:16px/1.65 system-ui,sans-serif; }
            .scenario-page { max-width:1000px; margin:auto; padding:40px 30px 64px; }
            a { color:#23649c; } a:focus-visible { outline:3px solid #377bb5; outline-offset:4px; }
            .kicker { color:#356c9d; font-size:12px; font-weight:750; letter-spacing:.12em; text-transform:uppercase; margin-top:28px; }
            h1 { font-size:clamp(32px,5vw,48px); line-height:1.12; letter-spacing:-.035em; margin:14px 0; }
            .intro { font-size:19px; color:#536b80; max-width:800px; }
            .overview,.scenario { background:#fff; border:1px solid #dce5ef; border-radius:16px; padding:26px; margin-top:22px; }
            .overview { background:#eaf2fa; } h2 { line-height:1.3; margin:0 0 14px; font-size:23px; }
            h3 { font-size:15px; margin:18px 0 3px; } p { margin:8px 0; }
            .scenario-header { display:flex; align-items:flex-start; justify-content:space-between; gap:16px; flex-wrap:wrap; }
            .status { font-size:12px; font-weight:700; border-radius:20px; background:#edf2f7; color:#36556e; padding:5px 12px; }
            .architecture { color:#356c9d; font-size:14px; font-weight:650; overflow-wrap:anywhere; }
            .scenario-columns { display:grid; grid-template-columns:1fr 1fr; gap:0 28px; }
            .demo-shortcuts { display:flex; flex-wrap:wrap; gap:12px 24px; margin-top:16px; }
            .note { color:#5b6d80; font-size:14px; } li { margin:8px 0; }
            @media(max-width:700px) { .scenario-page { padding:24px 16px 40px; } .scenario-columns { grid-template-columns:1fr; } .overview,.scenario { padding:20px; } }
        ''')
        page = root.div(class_='scenario-page')
        page.a('← Torna ai tre siti demo', href='/hello/demos/', target='_top')
        page.div('Presentazioni · Mappa delle integrazioni', class_='kicker')
        page.h1('Un framework, sette scenari')
        page.p('Gramlot costruisce l’interfaccia. Gli scenari cambiano il server che ospita le pagine e il modo in cui accedono ai dati.', class_='intro')
        page.p('Stato della preparazione al 15 settembre 2026. Le attività indicate sono da gestire nella riorganizzazione di codice, esempi e tutorial.', class_='note')
        overview = page.div(class_='overview')
        overview.h2('Cosa mostriamo oggi: tre siti, tre porte')
        overview.p('Il sito base FastAPI raccoglie tutorial, componenti ed esempi, con GnrApp su test_invoice_pg. Django mostra Bakery. Rosetta confronta Gramlot con altri framework: è una demo di confronto, non un ottavo scenario di integrazione.')
        links = overview.div(class_='demo-shortcuts')
        for label, url in (
            ('Base FastAPI · 8051', 'http://127.0.0.1:8051/'),
            ('Esempio database', 'http://127.0.0.1:8051/database/states/'),
            ('Django Bakery · 8063', 'http://127.0.0.1:8063/products/explore/'),
            ('Rosetta · 8026', 'http://127.0.0.1:8026/'),
        ):
            links.a(label, href=url, target='_blank', rel='noopener')
        for number, scenario in enumerate(SCENARIOS, 1):
            title, architecture, status, purpose, integration, current, pending = scenario
            card = page.div(class_='scenario', id=f'scenario-{number}')
            header = card.div(class_='scenario-header')
            header.h2(f'{number}. {title}')
            header.span(status, class_='status')
            card.p(architecture, class_='architecture')
            card.p(purpose)
            columns = card.div(class_='scenario-columns')
            left = columns.div()
            left.h3('Come si integra')
            left.p(integration)
            left.h3('Stato attuale')
            left.p(current)
            right = columns.div()
            right.h3('Da gestire')
            right.p(pending)
        organization = page.div(class_='overview')
        organization.h2('Come organizzare il materiale')
        organization.p('Il framework condiviso rimane in gramlot. I repository gramlot-fastapi, gramlot-genro-asgi e gramlot-django sono stati creati come boilerplate: la migrazione delle applicazioni e degli esempi deve ancora essere completata.')
        items = organization.ul()
        for text in (
            'Mantenere tutorial e componenti condivisi, distinguendoli dagli esempi specifici del server o del database.',
            'Dare a ogni scenario una configurazione, un comando di avvio e una pagina di ingresso riconoscibili.',
            'Documentare prerequisiti, dati di esempio e sequenza della presentazione.',
            'Definire la collocazione delle integrazioni Genropy classica e Genropy su ASGI, senza confonderle con il solo adapter DB.',
            'Scrivere le applicazioni in Python attraverso Gramlot, mantenendo il nucleo indipendente dal server.',
        ):
            items.li(text)
        page.p('Sette scenari non richiedono necessariamente sette repository o sette server contemporaneamente.', class_='note')
