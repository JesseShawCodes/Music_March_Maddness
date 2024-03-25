# app.py
from flask import Flask, request, jsonify, render_template, request, flash, url_for, redirect, abort, make_response
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"]="postgresql://postgres:postgres@db:5432/project_tracker"
app.config["SECRET_KEY"] = "b'}F\x009\x80\xb9\xb5\x8a\x86\xc0\xe4 9$s\x86\x12\xd2&\x9bB\x0b\xdc"
db = SQLAlchemy(app)

#an a array that will hodl for books.
books = [
    {
        "id": 1,
        "title": "CS50",
        "description": "Intro to CS and art of programming!",
        "author": "Havard",
        "borrowed": False
    },
    {
        "id": 2,
        "title": "Python 101",
        "description": "little python code book.",
        "author": "Will",
        "borrowed": False
    }
]
    
# get and jsonify the data
@app.route("/bookapi/books")
def get_books():
    """ function to get all books """
    return jsonify({"Books": books})


# get book by provided 'id'
@app.route("/bookapi/books/<int:book_id>", methods=['GET'])
def get_by_id(book_id):
    book = [book for book in books if book['id'] == book_id]
    if len(book) == 0:
        abort(404)
    return jsonify({"Book": books[0]})


#error handling
@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({"error": "not found!"}), 404)

@app.errorhandler(400)
def not_found(error):
    return make_response(jsonify({"error": "Bad request!"}), 400)


class Project(db.Model):
    __tablename__ = 'projects'
    project_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(length=50))

class Task(db.Model):
    __tablename__ = 'tasks'
    task_id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.project_id'))
    description = db.Column(db.String(length=50))

    project = db.relationship("Project")

@app.get("/")
def show_projects():
    return render_template("index.html", projects=Project.query.all())


@app.route("/project/<project_id>")
def show_tasks(project_id):
    # When SOmeone visits individual project page
    return render_template("project-tasks.html", 
        project=Project.query.filter_by(project_id=project_id).first(),
        tasks=Task.query.filter_by(project_id=project_id).all()
    )

@app.route("/add/project", methods=['POST'])
def add_project():
    if not request.form['project-title']:
        flash("Enter a title for your new project", "red")
    else:
        project = Project(title=request.form['project-title'])
        db.session.add(project)
        db.session.commit()
        flash("Project added successfully", "Green")
    return redirect(url_for('show_projects'))

@app.route("/add/task/<project_id>", methods=["POST"])
def add_task(project_id):
    # TODO: Add Task
    if not request.form['task-name']:
        flash("Enter Task Name", "Red")
    else:
        # Add to DB
        task = Task(description=request.form['task-name'], project_id=project_id)
        db.session.add(task)
        db.session.commit()
        flash("Task Added Successfully", "green")
    return redirect(url_for("show_tasks", project_id=project_id))

@app.route("/delete/task/<task_id>", methods=["POST"])
def remove_task(task_id):
    task = Task.query.get(task_id)
    db.session.delete(task)
    db.session.commit()
    flash("Task Removed Successfully", "green")
    return redirect(url_for('show_tasks', project_id=task.project_id))


@app.route("/delete/project/<project_id>", methods=["POST"])
def remove_project(project_id):
    tasks=Task.query.filter_by(project_id=project_id).delete()
    project = Project.query.get(project_id)
    db.session.delete(project)
    db.session.commit()


    flash("This project and all associated tasks have been deleted", "green")
    return redirect(url_for('show_projects'))

@app.route('/query-example')
def query_example():
    # if key doesn't exist, returns None
    language = request.args.get('language')

    # if key doesn't exist, returns a 400, bad request error
    framework = request.args['framework']

    # if key doesn't exist, returns None
    website = request.args.get('website')

    return '''
              <h1>The language value is: {}</h1>
              <h1>The framework value is: {}</h1>
              <h1>The website value is: {}'''.format(language, framework, website)

# allow both GET and POST requests
@app.route('/form-example', methods=['GET', 'POST'])
def form_example():
    # handle the POST request
    if request.method == 'POST':
        language = request.form.get('language')
        framework = request.form.get('framework')
        return '''
                  <h1>The language value is: {}</h1>
                  <h1>The framework value is: {}</h1>'''.format(language, framework)

    # otherwise handle the GET request
    return '''
           <form method="POST">
               <div><label>Language: <input type="text" name="language"></label></div>
               <div><label>Framework: <input type="text" name="framework"></label></div>
               <input type="submit" value="Submit">
           </form>'''

# GET requests will be blocked
@app.route('/json-example', methods=['GET'])
def json_example():
    return jsonify(
        username='g.user.username',
        email='g.user.email',
        id='g.user.id'
    )


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')