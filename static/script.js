
$(document).ready(function() {
    let socket;
    let lastQuery = null;
    let lastQueryData =null;

    function initializeSocket() {
        if (!socket) {
            socket = io.connect('http://localhost:5000');

            socket.on('show_answer', function(data) {
                $('#actual-answer').text(data.answer);
                stopLoadingAnimation();
                stopTimer();
            });

            socket.on('show_suggestions', function(data) {
                console.log("Received suggestions data:", data);
                console.log("Testing last query data:", lastQueryData);
                let suggestion = data.suggestions;
                let bubbleElement = createBubble(suggestion);
                if (bubbleElement) {  // Only append if the bubble is not a duplicate
                    $('#suggestions-bubbles').append(bubbleElement);
                }
            });

            // Socket listener to handle the graph image
            socket.on('show_graph', function(data) {
                console.log("Received graph data:", data);
                console.log("Testing last query data:", lastQueryData);
                let base64Image = data.image;
                $('#graph-image').attr('src', 'data:image/png;base64,' + base64Image);
            });

            // Socket listener to handle the insights
            // Socket listener to handle the insights
            socket.on('show_insight', function(data) {
                console.log("Received insight data:", data);
                console.log("Testing last query data:", lastQueryData);
                let insights = data.insights;
                let insightsHTML = '';

                // Check if there are insights available
                if (insights && insights.length > 0) {
                    for (let insight of insights) {
                        insightsHTML += `<p>${insight}</p>`;
                    }
                    $('#insight-section').html(insightsHTML);

                    // Show the #insight-section
                    $('#insight-section').show();
                } else {
                    // No insights available, hide the #insight-section
                    $('#insight-section').hide();
                }
            });

            socket.on('store_last_query_data', function(data) {
                console.log("Received last query data:", data);
                if (data.lastQueryData) {
                    lastQueryData = data.lastQueryData;
                    updateDashboardDropdown(lastQueryData.dashboards);
                }
            });
            

        }
    }

    function createBubble(suggestion) {
        console.log("Creating bubble with suggestion:", suggestion);
        
        // Check if a bubble with the same suggestion text already exists
        let existingBubbles = $('#suggestions-bubbles .bubble');
        for (let i = 0; i < existingBubbles.length; i++) {
            if ($(existingBubbles[i]).text() === suggestion) {
                console.log("Duplicate suggestion detected. Skipping...");
                return null;  // Return null if duplicate is found
            }
        }
    
        let bubble = $('<div class="bubble"></div>').text(suggestion);
        bubble.on('click', function() {
            $('#search-bar').val(suggestion);
            processQuery(suggestion);
        });
        return bubble;
    }


    function updateDashboardDropdown(dashboards) {
        // clear the dropdown content
        $('.dropdown-content').empty();
    
        // Loop through the dashboard names and add them to the dropdown
        for (let dashboard of dashboards) {
            let dashboardOption = $('<a href="#"></a>').text(dashboard);
            
            // Adding click event for the dashboard option
            dashboardOption.on('click', function(event) {
                event.preventDefault();
    
                // Extracting data from lastQueryData
                let dataToSend = {
                    'Data Source Name': lastQueryData['Data Source Name'],
                    'class': lastQueryData['class'],
                    'dashboard name': dashboard,  // Selected dashboard name
                    'graph_description': lastQueryData.graph_description,
                    'sql_query': lastQueryData.sql_query,
                    'plot_params': lastQueryData.plot_params
                };
    
                // AJAX call to send data to the server route
                $.ajax({
                    url: '/update_dashboard',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(dataToSend),
                    success: function(response) {
                        if (response.status === "success") {
                            console.log("Dashboard updated successfully!");
                        } else {
                            console.log("Failed to update dashboard.");
                        }
                    },
                    error: function() {
                        console.log("Error occurred while updating dashboard.");
                    }
                });
            });
    
            $('.dropdown-content').append(dashboardOption);
        }
        let newBtn = $('<button class="new-btn"><span class="new-btn-icon"></span></button>');  // Adjust text or any other attributes as required
        newBtn.on('click', function(event) {
            event.preventDefault();
            // Prompt user for the new dashboard name
        let newDashboardName = prompt("Enter the name for the new dashboard:");

        // Check if the user provided a name (i.e., didn't cancel and didn't provide an empty string)
        if (newDashboardName && newDashboardName.trim() !== "") {
            // Extracting data from lastQueryData
            let dataToSend = {
                'Data Source Name': lastQueryData['Data Source Name'],
                'class': lastQueryData['class'],
                'dashboard name': newDashboardName,  // Use the new dashboard name entered by the user
                'graph_description': lastQueryData.graph_description,
                'sql_query': lastQueryData.sql_query,
                'plot_params': lastQueryData.plot_params
            };

            // AJAX call to send data to the server route
            $.ajax({
                url: '/update_dashboard',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(dataToSend),
                success: function(response) {
                    if (response.status === "success") {
                        console.log("Dashboard created/updated successfully!");
                    } else {
                        console.log("Failed to create/update dashboard.");
                    }
                },
                error: function() {
                    console.log("Error occurred while creating/updating dashboard.");
                }
            });
        }

        });
        $('.dropdown-content').append(newBtn);
    }

    function processQuery(query) {
        if (query === lastQuery) {
            return;
        }

        // Clear out all previous bubbles
        $('#suggestions-bubbles').empty();

        lastQuery = query;
        $('#search-bar').prop('disabled', true);
        $('#actual-answer').text('');
        startLoadingAnimation();
        startTimer();
        $.ajax({
            url: '/get_answer',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ query: query }),
            complete: function() {
                $('#search-bar').prop('disabled', false);
            }
        });
    }

    $('#search-bar').on('keyup', function(e) {
        if (e.keyCode === 13) {
            let query = $(this).val();
            processQuery(query);
        }
    });

    function startLoadingAnimation() {
        clearInterval($('#loading-text').data('interval'));
        $('#loading-text').show();
        let texts = [
            "🤖 Booting up neural networks...",
            // ... (rest of the loading texts)
        ];
        let index = 0;
        $('#loading-text').text(texts[index]);
        let interval = setInterval(() => {
            index = (index + 1) % texts.length;
            $('#loading-text').text(texts[index]);
        }, 1000);
        $('#loading-text').data('interval', interval);
    }

    function stopLoadingAnimation() {
        clearInterval($('#loading-text').data('interval'));
        $('#loading-text').hide();
    }

    let timerInterval;
    let secondsElapsed = 0;

    function startTimer() {
        secondsElapsed = 0;
        updateTimerDisplay();
        timerInterval = setInterval(() => {
            secondsElapsed++;
            updateTimerDisplay();
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        $('#timer-section').text(`Time Taken: ${secondsElapsed} seconds`);
    }

    function updateTimerDisplay() {
        $('#timer-section').text(`It has been ${secondsElapsed} seconds since you initiated your request.`);
    }

    initializeSocket();

    let scaleValue = 1;  // Initial scale value for graph images
  
    
    $('.graph-section img').on('wheel', function(event) {
        // Prevent the default browser behavior
        event.preventDefault();

        // Increase or decrease the scale value based on the wheel direction
        if (event.originalEvent.deltaY < 0) {
            // Scrolling up (zoom in)
            scaleValue += 0.1;
        } else {
            // Scrolling down (zoom out)
            scaleValue -= 0.1;
        }

        // Apply the scaling transformation
        $(this).css('transform', `scale(${scaleValue})`);
    });




    $(document).ready(function() {
        $.ajax({
            url: '/get_left_nav_items',
            method: 'GET',
            success: function(data) {
                const leftNav = $(".left-nav");
                data.forEach(item => {
                    const itemElement = $(`<div class="nav-item"><a href="#"><span class="icon ${item.class}"></span> ${item.name} </a></div>`);
                    const dropdownElement = $("<div class='dropdown'></div>");
                    item.dropdown.forEach(option => {
                        // Update the link to point to the new Flask route
                        dropdownElement.append(`<a href="/page/${option}">${option}</a>`);
                    });
                    itemElement.append(dropdownElement);
                    leftNav.append(itemElement);
                });
            }
        });
    });
});
