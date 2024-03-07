{
    console.log("inside js")
    let updatePlacementStatus = () => {
        let placementStatus = $(`#placement-status`);
        let currentListLength = placementStatus.attr("class").split(" ")[2];
        console.log("currentListLength",currentListLength)
        for(let i = 0; i <= currentListLength; i++){
            let currentList = $(`#placement-status.${i}`);
            console.log("currentStatus", "dddddddddd", currentList, "index", "index")
            currentList.on('change', function () {
                let studentId = currentList.attr('class').split(" ")[0];
                let companyId = currentList.attr("class").split(" ")[1];
                let status = currentList.val()
                window.location.pathname = `/interviews/update/${studentId}/${companyId}/${status}`
            })
            
        }
    }

    let toggleInterviewList = () => {
        // let expand = $("#arrow")
        // let container_id = Company_container.attr('class')
        // let list = $("#show-list")
        // container_id.on('click', function(){
        //     console.log("clicked on container")
        //     if (list.hasClass('container_id')) {
        //         list.removeClass('show-list').addClass('hide-list');
        //     } else {
        //         list.removeClass('hide-list').addClass('show-list');
        //     }
        // });
        // let Company_container = $('#Company-container')
        // let container_id = Company_container.attr('class')
        // let list = $("#show-list")
        // $(".arrow").each(function () {
        //     if (arrow.hasClass(container_id)) {
        //         if (arrow.hasClass('show-list')) {
        //             list.removeClass('show-list').addClass('hide-list');
        //         } else {
        //             list.removeClass('hide-list').addClass('show-list');
        //         }
        //     }
        // });

        $(".arrow").on("click", function () {
            let interviewId = $(this).attr("class").split(" ")[1];
            let showList = $(`#show-list.${interviewId}`);
            console.log(showList)
            // console.log("true", interviewId)
            let selectedShowList = $(`.${interviewId}.show-list`)
            let selectedHideList = $(`.${interviewId}.hide-list`)
            if (selectedShowList.length > 0) {
                // console.log(showList.length)
                // let selectedList = $(`.${interviewId}`).find(`.${interviewId}.show-list`)
                console.log("if",selectedShowList)
                selectedShowList.removeClass('show-list').addClass('hide-list');
            } else {
                // console.log(showList.length)
                // let selectedList = $(`.${interviewId}.hide-list`)
                // let selectedList = $(`.${interviewId}`).find(`.${interviewId}.hide-list`)
                console.log("else",selectedHideList)
                selectedHideList.removeClass('hide-list').addClass('show-list');
            }
        }
        );

    }

    $(document).ready(function () {
        updatePlacementStatus()
        // removeCompany()
        toggleInterviewList()
    })


}