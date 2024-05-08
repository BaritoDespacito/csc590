using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class SkullMove : MonoBehaviour
{
    
    // public Transform Player;
    // int MoveSpeed = 4;
    // int MaxDist = 10;
    // int MinDist = 0;
    
    public NavMeshAgent agent;
    public GameObject player;
    
    // Start is called before the first frame update
    void Start()
    {
        player = GameObject.FindGameObjectWithTag("Player");
    }

    // Update is called once per frame
    void Update()
    {
        // transform.LookAt(Player);
        // if (Vector3.Distance(transform.position, Player.position) >= MinDist)
        // {
        //     transform.position += MoveSpeed * Time.deltaTime * transform.forward;
        //     if (Vector3.Distance(transform.position, Player.position) <= MaxDist)
        //     {
        //         // Can call function to shoot or dash in or something
        //     }
        // }

        agent.SetDestination(player.transform.position);
    }
}
