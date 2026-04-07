import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

const API_BASE = "http://localhost:5000";

const AdminDashboard = () => {

const [activeTab,setActiveTab] = useState("Sacrament Records");
const [view,setView] = useState("list");
const [search,setSearch] = useState("");

const [form,setForm] = useState({});
const [errors,setErrors] = useState({});
const [fetchError,setFetchError] = useState("");

useEffect(() => {
  const loadRecords = async () => {
    try {
      const response = await fetch(`${API_BASE}/records`);
      if (!response.ok) throw new Error("Unable to load records");
      const data = await response.json();
      setRecords(data);
    } catch (err) {
      console.error(err);
      setFetchError("Could not load parish records from the server.");
    }
  };
  loadRecords();
}, []);


/* ---------------------------
DATA
----------------------------*/

const [records,setRecords] = useState([]);

const [families,setFamilies] = useState([
{
id:"FAM1001",
name:"Johnson Family",
phone:"+15550101",
members:2
}
]);

const [communities,setCommunities] = useState([
{
name:"Altar Servers",
desc:"Assisting priests during liturgical services.",
head:"HEAD_ALTAR"
},
{
name:"Lectors Guild",
desc:"Assigning Readings to Parish members.",
head:"HEAD_LECTORS"
}
]);

const [donationOptions,setDonationOptions] = useState([
{name:"To the Church",desc:"General maintenance"},
{name:"To Pilar Church",desc:"Sister parish mission"},
{name:"Good Samaritan Fund",desc:"Helping the needy"}
]);

const [massBookings] = useState([
{
name:"John Johnson",
intentions:"For family blessings",
date:"2024-06-12",
time:"8:00 AM",
status:"Confirmed"
}
]);

const [donations] = useState([
{
donor:"John Johnson",
fund:"To the Church",
amount:500,
date:"2024-06-01",
status:"Completed"
}
]);

/* ---------------------------
FORM HANDLING
----------------------------*/

const handleInputChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

/* ADD RECORD */

const handleSaveRecord = async ()=>{
  if(!form.name || !form.type){
    setErrors({
      name:!form.name?"Name required":"",
      type:!form.type?"Type required":""
    });
    return;
  }

  const payload = {
    type: form.type,
    name: form.name,
    familyId: form.familyId || "",
    date: form.date || new Date().toISOString().slice(0,10)
  };

  try {
    const response = await fetch(`${API_BASE}/records`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error("Could not save record");

    const saved = await response.json();
    setRecords(prev => [...prev, saved]);
    setView("list");
    setForm({});
    setErrors({});
  } catch (err) {
    console.error(err);
    setFetchError("Unable to save the new record.");
  }
};

/* ADD FAMILY */

const handleAddFamily = ()=>{

if(!form.name || !form.phone) return;

setFamilies([
...families,
{
id:"FAM"+Math.floor(Math.random()*10000),
name:form.name,
phone:form.phone,
members:1
}
]);

setView("list");
setForm({});
};

/* ADD COMMUNITY */

const handleAddCommunity = ()=>{

setCommunities([
...communities,
{
name:form.name,
desc:form.desc,
head:form.head
}
]);

setView("list");
setForm({});
};

/* ADD DONATION OPTION */

const handleAddDonationOption = ()=>{

setDonationOptions([
...donationOptions,
{
name:form.name,
desc:form.desc
}
]);

setView("list");
setForm({});
};

/* SEARCH */

const filteredRecords = records.filter((r)=>
r.name.toLowerCase().includes(search.toLowerCase())
);

/* ---------------------------
UI
----------------------------*/

return(

<div className="admin-container">

{/* HEADER */}

<div className="admin-header">
  <div>
    <h1>Parish Admin Dashboard</h1>
  </div>
  <div className="header-buttons">
    <button className="add-btn" onClick={()=>{setActiveTab("Families (SMS Ready)"); setView("add");}}>
      + Add Family
    </button>
    <button className="export-btn">
      Export (Max 40)
    </button>
  </div>
</div>

{/* STATS */}

<div className="stats">

<div className="card">
<p>Total Families</p>
<h2>{families.length}</h2>
</div>

<div className="card">
<p>Parish Records</p>
<h2>{records.length}</h2>
</div>

<div className="card">
<p>Communities</p>
<h2>{communities.length}</h2>
</div>

<div className="card">
<p>Mass Bookings</p>
<h2>{massBookings.length}</h2>
</div>

</div>

{/* TABS */}

<div className="tabs">

{[
"Sacrament Records",
"Families (SMS Ready)",
"Communities",
"Donation Options",
"Mass Bookings",
"Donations Received"
].map(tab=>(
<button
key={tab}
className={activeTab===tab?"active-tab":""}
onClick={()=>{
setActiveTab(tab);
setView("list");
}}
>
{tab}
</button>
))}

</div>

{/* SEARCH */}

<div className="search-actions">
  <div className="search-section">
    <input
      placeholder="Search records by name, family ID, or type..."
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
    />
    <button className="filter-btn">Filter</button>
  </div>
  <button className="new-btn" onClick={()=>setView("add")}>+ New Record</button>
</div>

<div className="tab-content">

{/* SACRAMENT RECORDS */}

{activeTab==="Sacrament Records" &&(

view==="list"?(
<div className="records-card">
  <div className="records-header">
    <h3>Archival Parish Records</h3>
    <p className="sub">Manage and link life event records to family accounts.</p>
  </div>

  {fetchError && <p className="error-message">{fetchError}</p>}
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Person Name</th>
        <th>Family ID</th>
        <th>Date</th>
      </tr>
    </thead>

    <tbody>

{filteredRecords.map(r=>(
<tr key={r.id}>
<td>{r.type}</td>
<td>{r.name}</td>
<td>{r.familyId}</td>
<td>{r.date}</td>
</tr>
))}

</tbody>

</table>

</div>
):(

<div className="sacrament-card">

<div className="back-link" onClick={()=>setView("list")}>← Back</div>

<h2>Add Record</h2>

<input type="date" name="date" onChange={handleInputChange}/>
<input type="text" name="name" placeholder="Name" onChange={handleInputChange}/>
<input type="text" name="familyId" placeholder="Family ID" onChange={handleInputChange}/>
<textarea name="type" placeholder="Sacrament Type" onChange={handleInputChange}/>

<button onClick={handleSaveRecord}>Save</button>

</div>

)
)}

{/* FAMILIES */}

{activeTab==="Families (SMS Ready)" &&(

view==="list"?(
<div>

<button className="new-btn" onClick={()=>setView("add")}>
+ Add Family
</button>

<table>

<thead>
<tr>
<th>Family ID</th>
<th>Name</th>
<th>Phone</th>
<th>Members</th>
</tr>
</thead>

<tbody>

{families.map((f,i)=>(
<tr key={i}>
<td>{f.id}</td>
<td>{f.name}</td>
<td>{f.phone}</td>
<td>{f.members}</td>
</tr>
))}

</tbody>

</table>

</div>
):(

<div className="family-card">

<div className="back-link" onClick={()=>setView("list")}>← Back</div>

<h2>Add Family</h2>

<input type="text" name="name" placeholder="Family Name" onChange={handleInputChange}/>
<input type="text" name="phone" placeholder="Phone Number" onChange={handleInputChange}/>

<button onClick={handleAddFamily}>Add Family</button>

</div>

)
)}

{/* COMMUNITIES */}

{activeTab==="Communities" &&(

view==="list"?(
<div>

<button className="new-btn" onClick={()=>setView("add")}>
+ New Community
</button>

<table>

<thead>
<tr>
<th>Name</th>
<th>Description</th>
<th>Head</th>
</tr>
</thead>

<tbody>

{communities.map((c,i)=>(
<tr key={i}>
<td>{c.name}</td>
<td>{c.desc}</td>
<td>{c.head}</td>
</tr>
))}

</tbody>

</table>

</div>
):(

<div className="comunity-card">

<div className="back-link" onClick={()=>setView("list")}>← Back</div>

<h2>Add Community</h2>

<input name="name" placeholder="Community Name" onChange={handleInputChange}/>
<input name="head" placeholder="Head ID" onChange={handleInputChange}/>
<textarea name="desc" placeholder="Description" onChange={handleInputChange}/>

<button onClick={handleAddCommunity}>Add Community</button>

</div>

)
)}

{/* DONATION OPTIONS */}

{activeTab==="Donation Options" &&(

view==="list"?(
<div>

<button className="new-btn" onClick={()=>setView("add")}>
+ New Option
</button>

<table>

<thead>
<tr>
<th>Name</th>
<th>Description</th>
</tr>
</thead>

<tbody>

{donationOptions.map((d,i)=>(
<tr key={i}>
<td>{d.name}</td>
<td>{d.desc}</td>
</tr>
))}

</tbody>

</table>

</div>
):(

<div className="donation-card">

<div className="back-link" onClick={()=>setView("list")}>← Back</div>

<h2>Add Donation Option</h2>

<input name="name" placeholder="Fund Name" onChange={handleInputChange}/>
<textarea name="desc" placeholder="Description" onChange={handleInputChange}/>

<button onClick={handleAddDonationOption}>Add Option</button>

</div>

)
)}

{/* MASS BOOKINGS */}

{activeTab==="Mass Bookings" &&(

<table>

<thead>
<tr>
<th>Name</th>
<th>Intentions</th>
<th>Date</th>
<th>Time</th>
<th>Status</th>
</tr>
</thead>

<tbody>

{massBookings.map((b,i)=>(
<tr key={i}>
<td>{b.name}</td>
<td>{b.intentions}</td>
<td>{b.date}</td>
<td>{b.time}</td>
<td>{b.status}</td>
</tr>
))}

</tbody>

</table>

)}

{/* DONATIONS */}

{activeTab==="Donations Received" &&(

<table>

<thead>
<tr>
<th>Donor</th>
<th>Fund</th>
<th>Amount</th>
<th>Date</th>
</tr>
</thead>

<tbody>

{donations.map((d,i)=>(
<tr key={i}>
<td>{d.donor}</td>
<td>{d.fund}</td>
<td>₹ {d.amount}</td>
<td>{d.date}</td>
</tr>
))}

</tbody>

</table>

)}

</div>

</div>

);

};

export default AdminDashboard;