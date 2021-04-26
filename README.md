# Doceyes

<h2> A tamper proof document storage system </h2>

<h2> Project Description </h2>
Information is the cornerstone for doing business and tampering or leaking it can have devastating consequences.
<hr>

<h2> Motivation </h2>
The motivation for this project is to address a seemingly small and often neglected but important
activity for many businesses while developing the skills acquired through the blockchain development program 
at George Brown College and finally as part of the requirement for the fulfillment of the DAPPII course.
<hr>


<h2> Problem </h2>
Data is one of the most critical assets of an organization and usually prime targets of an attacker. 
Data tampering can have severe consequences on an organization. Many organization today rely on shared folders or some 
repo for storing data with valuable transaction details. The volume of documents can be huge and effectively monitoring 
such repo to detect either intended or unintended modification is very important.
<hr>

<h2> Goal </h2>
The goal of this project is to develop a system which secures documents and files using blockchain. This will help to 
quickly detect data tampering and restore modified files from a distributed storage (IPFS). 
The above goal gives rise to the following core project objectives.
<hr>

<ul>
    <li> To review literature and evaluate similar tools</li>
    <li> To design, develop, implement and appraise a tool for tamper-proof document storage </li>
</ul>


<h2> Measuring Success </h2>
<ul>
    <li> A user should be able to see list of files being monitored </li>
    <li> Modification should be detected with 5secs and user alerted. </li>
    <li> User should be able to take action. Accept modification or restore from ipfs.</li>
</ul>
<hr>

<h2> Use Case Diagram </h2>

![State Diagram](documents/Pics/DocEyes-UseCaseDiag.png?raw=true) <br>

<hr>

<h2> User Stories </h2>
<ul>
        <li> The system should allow a user to select repository or folders to be monitored. </li>
        <li> The system should notify when monitoring has started. </li>
        <li> The system should show current state of repository </li>
        <li> The system should notify when any changes have been made to the repository. </li>
        <li> The system should enable user to take action on detected changes such as restore data. </li>
        <li> The system should maintain and show repository history. </li>
</ul>
<hr>

<h2> Sequence Diagram </h2>

![State Diagram](documents/Pics/DocEyes-SeqDiag.png?raw=true) <br>
<hr>


<h2> How Doceyes help with data tampering prevention </h2>
Just like a typical File Integrity Monitor which assess system files and generates a cryptographic checksum as a baseline.
Then repeatedly recalculates the checksum of the same resources, compare with the baseline and generate alert if there is changes.
Doceyes records hash signatures for documents within a repo using blockchain (Hyperledger Fabric) as the trusted baseline.
Then checks at fixed intervals to see whether files have been modified If any changes have been made, 
it will throw a notification and inform the user.

<h3> Core steps: </h3>
<ol>
        <li> Obtain the directory or repo location to be secured </li>
        <li> Compute the hash of each document in the secured folder </li>
        <li> Compute the hash of the file tree for the secured directory </li>
        <li> Compute the hash of an array containing the last modified time for each file in the secured directory. </li>
        <li> Calculate the File tree hash (FTH) and array of last Modified time hash(MTH) every 5secs </li>
        <li> If it doesnt match, then a change has occurred. Then validate the hash of each individual file in 
            secured directory with baseline on blockchain to identify the tampered or new files and display these 
            to the user. 
        </li>        
</ol>


<h2> Benefits </h2>
<ul>
    <li> <strong> Security:  </strong> Blockchain’s inherent property of immutability is used to establish the trusted 
        baseline to compare latest versions of documents
    </li>
     <li> <strong> Build Trust: </strong> Information can be accessible to any partner of the organization authorized 
        to do so – which provides maximum transparency.
    </li>
      <li> <strong> Efficiency: </strong> Modular structure and utilizes asynchronous programming concept to speed up 
        monitoring and reporting which is usually resource intensive.
    </li>
</ul>
<hr>

<h2> Other applications and benefits </h2>

<h2> Conclusion </h2>