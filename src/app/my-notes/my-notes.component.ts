import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { LoginService } from '../login.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  providers: [ModalComponent],
  selector: 'app-my-notes',
  templateUrl: './my-notes.component.html',
  styleUrls: ['./my-notes.component.css']
})
export class MyNotesComponent implements OnInit {
  // public list: object[];

  // Its important that the variable is initialised Public if you want to use it
  // HTML template #####IMPORTANT###
  public list: Notes[] = [];
  public list2: Notes[] = [];

  public myNotes= new Notes;

  constructor(private userDataService: UserDataService,
    private _loginService: LoginService,
    private _modalView: ModalComponent) {
    // this.list = [
    //   {
    //     setup: "What did the cheese say when it looked in the mirror?",
    //   },
    //   {
    //     setup: "What kind of cheese do you use to disguise a small horse?",
    //   },
    //   {
    //     setup: "A kid threw a lump of cheddar at me",
    //   },
    // ];

  }

  ngOnInit() {
    this.userDataService.getNotes().subscribe(res =>
      this.setNotes(res)
    );
  }

  checkLogin() {
    if (this._loginService.isLoggedIn()) {
      console.log("User Logged In");

    }
    else {
      // Only show modal when user makes a update request and session is expired.
      this._modalView.show();

    }
  }
  // saving notes to DATABASE (Backend)
  saveNote(note) {
    if (note.id.length > 8) {
      // update note 
      console.log("MongoDB Id");
      if (this._loginService.isLoggedIn()) {
        console.log(note.notesTitle, note.notesTitle);
        this.userDataService.updateNotes(note.id, note.notesTitle, note.notesContent).subscribe(res =>
          this.logData(res, note)
        )
        console.log(this.myNotes);
        console.log(this.list2)
        // console.log(this.list)
      }
      else {
        this._modalView.show();
      }
    }
    else {
      // Add new note to database
      console.log("My Id");
      // Once the note is saved in database retrieve the ID back and update the current ID
      //  else if we press save again , it will create a new note object 
      //  Update the Id object locally upon saving
      if (this._loginService.isLoggedIn()) {
        console.log(note.notesTitle, note.notesTitle);
        this.userDataService.sendNotes(note.notesTitle, note.notesContent).subscribe(res =>
          this.logData(res, note)
        )
        console.log(this.myNotes);
        console.log(this.list2)
        // console.log(this.list)
      }
      else {
        this._modalView.show();
      }
    }


  }
  logData(response, note) {
    console.log(response);
    note.id = response.savedNoteId;
    console.log(this.list2);

  }

  // This function not needed but keep it for future use. when the note title.len is 0 it will be blank in the note list
  onKey(note) {
    console.log("Im firing");
    console.log(note.notesTitle.length)
    if (note.notesTitle.length < 1) {
      console.log("Shipping new note");
      note.notesTitle = "Awesome Note";
    }
  }
  //adds new note to the listNote
  addNewNote() {
    if (this._loginService.isLoggedIn()) {
      console.log("Add New Note");
      var tempId = this.getLengthOfListArray() - 1; 
      var newNote = {
        id: this.getLengthOfListArray() - 1,
        "notesTitle": "Awesome Title",
        "notesContent": "Start Writing"
      };
      this.saveNote(newNote);
      this.list2.push(newNote);
      console.log(tempId);
      console.log(this.list2);
    }
    else {
      // console.log("User session Finished show LOGIN");
      // this.userDataService.myFunctionList.push("addNote()");
      // console.log(this.userDataService.myFunctionList);
      this._modalView.show();
    }

  }

  // Update Note
  updateNote() {
    console.log("Function to update a note");

  }
  getLengthOfListArray(): number {
    return this.list2.length;
  }

  deleteNote(note) {

    console.log("Delete this note: ", note);
    if (this._loginService.isLoggedIn()) {
      // console.log(note.notesTitle, note.notesTitle);
      console.log(note.id);
      this.userDataService.deleteNotes(note.id).subscribe(res =>
        this.deleteMessages(res)
      )
      var idToDelete = this.findIndexOfArray(this.list2, note.id);
      note.id = 0;
      // note.id = idToDelete;
      this.list2.splice(idToDelete,1);
      console.log(this.list2);
    }
    else {
      this._modalView.show();
    }
  }

  deleteMessages(response){
    console.log(response);
  }
  findIndexOfArray(list2, noteId) {
    for (var i = 0; i < list2.length; i += 1) {
      if (list2[i]["id"] === noteId) {
        console.log(i);
        return i;
      }
    }
    return -1;
  }

  // Loads and shows all the user notes from the Database
  setNotes(response) {
    // console.log(response);
    console.log(response.Result);

    this.list = response.Result;
    for (let data of response.Result) {
      this.list2.push({ id: data._id, notesTitle: data.title, notesContent: data.content })
      // console.log(data.title);
    }
    // this.myNotes = this.list[0].content;
    // console.log(this.list);
    // console.log(this.list.length);
    // for (let i = 0; i < this.list.length; i++) {

    //   // console.log(this.list[i].title);
    //   this.list2.push({ id: i, notesTitle: this.list[i].title, notesContent: this.list[i].content })
    // }
    console.log(this.list2);

    // let myarray: Notes[] = new Array<Notes>();
    // var i: number;
    // i = 0;
    // let arraylist = [];
    // // let list: string[] = [];
    // for (let result of response.Result) {
    //   // console.log(entry.title); // 1, "string", false
    //   // console.log(entry.content); // 1, "string", false
    //   // myarray.push({id: '25833' ,notesTitle:"sa" ,notesContent:"dasd" })
    //   // this.list[i]=[
    //   //   {
    //   //     title: entry.title,
    //   //     content: entry.content
    //   //   }
    //   // ]
    //   // i=i+1;

    //   let obj1 = {} as Notes;
    //   obj1.id = i;
    //   obj1.notesTitle = result.title;
    //   obj1.notesContent = result.content;
    //   arraylist.push([obj1])
    //   i = i + 1
    //   // arraylist =[obj1];
    // }
    // console.log(arraylist);
    // for (let data in arraylist) {
    //   console.log(data)
    //   var tempData: Notes = arraylist[data];
    //   console.log(this.list.push(tempData[0]));
    //   console.log("Ss " + arraylist[data]);
    //   // let d: Notes = data[0];
    //   // console.log(d.notesContent);
    // }
    // // this.noteTitle = response.title;
    // // this.note = response.email;
    // console.log(this.list);
    // console.log(this.list.length);
    // for (var i = 0; i < this.list.length; i++) {
    //   console.log(this.list[i].notesContent);
    // }
    // for (let tempData2 of this.list) {
    //   console.log(tempData2.notesTitle);

    // }
    // this.data22 = this.list.length;
  }

  // Loads once the user clicks title of the note from he list 
  // then that note is sent to editable section
  loadNote(hero) {
    console.log(hero);
    // console.log(this.list);
    // console.log(this.list[index].content);
    var aNote = new Notes;
    aNote.id = hero.id;
    aNote.notesContent = hero.notesTitle;
    aNote.notesTitle = hero.notesContent;
    this.myNotes = hero;
    console.log(this.myNotes.id);
  }
}
class Notes {
  id: number;
  notesTitle: string;
  notesContent: string;
}
