const apiClient = axios.create()
$list = $('#list')
$submit = $('#submit')
$newToDo = $('#new-todo')


apiClient({method: "get", url: '/api/todos'}).then((apiData) => {
    let todos = apiData.data;
    todos.forEach((t) => {
        $list.append(`
        <div id="${t._id}" class="columns is-centered"> 
            <div class = "column is-one-quarter is-centered has-text-centered">
                <button class="complete button is-primary has-text-centered"> ${t.completed ? "Complete" : "Incomplete"}</button> 
            </div>
            <div class="column is-one-half has-text-centered"> ${t.body}
            </div>
            <div class="column has-text-centered">
                <button class="destroy button is-danger has-text-centered"> Remove </button>
            </div>
        </div>
        `)
    })
})

$submit.on('click', function() {
    const formData = {
        body: $newToDo.val()}
    apiClient({method: "post", url: '/api/todos', data: formData}).then((apiData) => {
        let task = apiData.data.toDo
        $list.append(`
        <div id="${task._id}" class="columns is-centered"> 
            <div class = "column is-one-quarter has-text-centered">
                <button class="complete button is-primary has-text-centered"> ${task.completed ? "Complete" : "Incomplete"}</button> 
            </div>
            <div class="column is-one-half has-text-centered"> ${task.body}
            </div>
            <div class="column has-text-centered">
                <button class="destroy button is-danger has-text-centered"> Remove </button>
            </div>
        </div>
        `)
    })
    $newToDo.val("")
})

$list.on('click', '.destroy', function(){
    let parent = $(this).parent().parent()
    let id = $(this).parent().parent().attr("id");
    apiClient({method: "delete", url: `/api/todos/${id}`}).then(function(apiData){
        console.log("Task Deleted")
        parent.remove()
    })
})

$list.on('click', '.complete', function(){
    let $complete = $(this)
    let parent = $(this).parent().parent()
    let id = parent.attr('id')
    apiClient({method: "patch", url: `/api/todos/${id}`}).then(function(apiData) {
        console.log("Task completed");
        $complete.text(apiData.data.toDo.completed ? "Complete" : "Incomplete")
    })
})