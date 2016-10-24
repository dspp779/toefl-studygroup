#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Blueprint, render_template, jsonify, request
from app.models import Vocabulary
from os import path
import json

home = Blueprint('home', __name__, template_folder='templates', static_folder='static')


@home.route('/')
def index():
    datas = Vocabulary.query.all()
    return render_template('vocabulary.html', datas=datas)


@home.route('/vocabulary/<data_type>/<id>')
def vocabulary(data_type, id):
    data = Vocabulary.query.filter_by(id=id).first()
    filename = data.file_name
    with open(path.abspath(path.dirname(__file__)) + '/../static/vocabulary/' + filename, 'r') as f:
        vocabularies = json.load(f)

        if data_type == 'a':
            vocabularies = [d[0] for d in vocabularies]
        elif data_type == 'q':
            vocabularies = [d[1] for d in vocabularies]

        return jsonify({
            'name': filename,
            'entries': vocabularies
        })
