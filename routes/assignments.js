let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
function getAssignmentsSansPagination(req, res){
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    });
}

function getAssignments(req, res) {
    var aggregateQuery = Assignment.aggregate();
    
    Assignment.aggregatePaginate(aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      },
      (err, assignments) => {
        if (err) {
          res.send(err);
        }
        res.send(assignments);
      }
    );
   }
   
// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;

    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    Assignment.countDocuments({}, (err, count) => {
        if (err) {
            res.send('Impossible de compter l\'assignment ', err);
            return;
        }
        let assignment = new Assignment();
        assignment.id = count + 1;
        assignment.nom = req.body.nom;
        assignment.dateDeRendu = req.body.dateDeRendu;
        assignment.rendu = req.body.rendu;
        assignment.auteurName = req.body.auteurName;
        assignment.auteurPhoto = req.body.auteurPhoto;
        assignment.note = req.body.note;
        assignment.remarques = req.body.remarques;
        assignment.matiere = req.body.matiereId;

        console.log("POST assignment reçu :");
        console.log(assignment);

        assignment.save((errSave) => {
            if (errSave) {
                res.send('Impossible de créer l\'assignment', errSave);
                return;
            }

            res.json({ message: `${assignment.nom} enregistré!` });
        });
    });
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: assignment.nom + 'updated'})
        }

      // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
