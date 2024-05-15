using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class SkullMove : MonoBehaviour
{
    
    // public Transform Player;
    // int MoveSpeed = 4;

    [SerializeField] private float normalSpeed = 3.5f;
    [SerializeField] private float attackSpeed = 7f;
    
    private double AttackDist = 7.5;
    private int MoveDist = 25;
    
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
        if (Vector3.Distance(transform.position, player.transform.position) <= MoveDist)
        {
            agent.SetDestination(player.transform.position);
            if (Vector3.Distance(transform.position, player.transform.position) <= AttackDist)
            {
                agent.speed = attackSpeed;
            }
            else
            {
                agent.speed = normalSpeed;
            }
        }

        // agent.SetDestination(player.transform.position);
    }

    private void OnTriggerEnter(Collider other)
    {
        Debug.Log("enemy hit");
        if (other.gameObject.CompareTag("Bullet"))
        {
            Destroy(gameObject);
        }
    }
}
