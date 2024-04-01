{
    console.log("inside js")
    // let updatePlacementStatus = () => {
    //     $(".placement-status").each(function () {
    //         let currentList = $(this);
    //         currentList.on('change', function () {
    //             console.log("inside loop")
    //             let studentId = currentList.attr('class').split(" ")[0];
    //             let companyId = currentList.attr("class").split(" ")[1];
    //             let status = currentList.val();
    //             if (status) {
    //                 window.location.pathname = `/interviews/update/${studentId}/${companyId}/${status}`;
    //             }
    //         });
    //     });
    // };
    let updatePlacementStatus = () => {
        let placementStatus = $(`#placement-status`);
        if (placementStatus.length > 0) {
            let currentListLength = placementStatus.attr("class").split(" ")[2];
            console.log("currentListLength", placementStatus, currentListLength)
            for (let i = 0; i <= currentListLength; i++) {
                let currentList = $(`#placement-status.${i}`);
                console.log("currentStatus", "dddddddddd", currentList, "index", "index")
                currentList.on('change', function () {
                    let studentId = currentList.attr('class').split(" ")[0];
                    let companyId = currentList.attr("class").split(" ")[1];
                    let status = currentList.val()
                    if(status){
                        window.location.pathname = `/interviews/update/${studentId}/${companyId}/${status}`
                    }
                })
            }
        }
    }
    let toggleInterviewList = () => {
        $(".arrow").on("click", function () {
            let interviewId = $(this).attr("class").split(" ")[1];
            let showList = $(`#show-list.${interviewId}`);
            console.log(showList)
            let selectedShowList = $(`.${interviewId}.show-list`)
            let selectedHideList = $(`.${interviewId}.hide-list`)
            if (selectedShowList.length > 0) {
                // console.log("if", selectedShowList)
                selectedShowList.removeClass('show-list').addClass('hide-list');
            } else {
                // console.log("else", selectedHideList)
                selectedHideList.removeClass('hide-list').addClass('show-list');
            }
        }
        );
    }

    $(document).ready(function () {
        updatePlacementStatus()
        toggleInterviewList()
    })


}